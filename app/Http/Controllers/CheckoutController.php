<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RomanianCounty;
use App\Models\RomanianCity;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function index()
    {
        session(['checkout_visited' => true]);

        $counties = RomanianCounty::all();
        $data = [];
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('order_status', 'open')
            ->first();
        $orderItems = [];
        if ($order) {
            $orderItems = $order->items()->with('product')->get();
        }
        if ($order) {
            if ($order->total_discounted_price) {
                $total = $order->total_discounted_price;
            } else {
                $total = $order->total_price;
            }
        }

        foreach ($counties as $county) {
            $cities = RomanianCity::where('county_code', $county->county_code)
                ->pluck('city_name')
                ->toArray();

            $data[$county->county_name] = $cities;
        }

        if (count($orderItems) != 0) {
            return Inertia::render('Checkout', [
                'counties' => $data,
                'orderItems' => $orderItems,
                'order' => $order,
                'total' => $total,
            ]);
        } else {
            abort(403);
        }
    }

    public function addAddress(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'city' => 'required|string',
                'county' => 'required|string',
                'address' => 'required|string',
                'postal_code' => 'required|string',
                'phone_number' => 'required|string',
            ]);

            $user = Auth::user();
            $order = Order::where('user_id', $user->id)
                ->where('order_status', 'open')
                ->first();

            if (!$order) {
                throw new \Exception('Order not found for the user');
            }

            $shipping_address = $request->name . ";" . $request->city . ";" . $request->county . ";" . $request->address . ";" . $request->postal_code . ";" . $request->phone_number;
            $order->update([
                'shipping_address' => $shipping_address,
            ]);
        } catch (\Exception $e) {
            Log::error('Error occurred while adding address: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to add address. Please try again later.'], 500);
        }
    }


    public function addPayment(Request $request)
    {
        try {
            $request->validate([
                'payment_method' => 'required|string',
            ]);

            $user = Auth::user();
            $order = Order::where('user_id', $user->id)
                ->where('order_status', 'open')
                ->first();

            if (!$order) {
                throw new \Exception('Order not found for the user');
            }

            $order->update([
                'payment_method' => $request->payment_method,
            ]);

            return redirect('/cart/summary')->with('success', 'Payment method added successfully');
        } catch (\Exception $e) {
            Log::error('Error occurred while adding payment method: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to add payment method. Please try again later.'], 500);
        }
    }
}
