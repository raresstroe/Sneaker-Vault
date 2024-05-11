<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Mail\MyTestEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SummaryController extends Controller
{
    public function index()
    {
        if (!session('checkout_visited')) {
            return redirect()->route('checkout');
        }
        $user = Auth::user();

        $order = Order::where('user_id', $user->id)
            ->where('order_status', 'open')
            ->first();
        $orderItems = [];
        if ($order) {
            $orderItems = $order->items()->with('product')->get();
        }

        if ($order->total_discounted_price) {
            $total = $order->total_discounted_price;
        } else {
            $total = $order->total_price;
        }

        return Inertia::render('Summary', [
            'orderItems' => $orderItems,
            'order' => $order,
            'total' => $total,
        ]);
    }

    public function send()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('order_status', 'open')
            ->first();
        Log::info("total" . $order->total_discounted_price);
        if ($order->total_discounted_price < 450 || $order->total_price < 450) {
            $order->total_price += 20;
            $order->total_discounted_price += 20;
        }
        $order->order_status = 'pending';
        $order->save();

        $name = $user->name;
        $email = $user->email;
        $lastUserOrder = Order::where('user_id', $user->id)
            ->where('order_status', 'pending')
            ->latest()
            ->first();

        \Carbon\Carbon::setLocale('ro');
        $orderDate = $lastUserOrder->updated_at->translatedFormat('d F Y');
        $deliveryDate = $lastUserOrder->updated_at->addDays(3)->translatedFormat('d F Y');
        $id = $lastUserOrder->id;
        if ($lastUserOrder->payment_method == 'card') {
            $paymentMethod = "Plata cu cardul";
        } elseif ($lastUserOrder->payment_method == 'cash') {
            $paymentMethod = "Plata cu Ramburs";
        } else {
            $paymentMethod = "Paypal";
        }
        $addressParts = explode(';', $lastUserOrder->shipping_address);
        $address = $addressParts[3];
        $postalCode = $addressParts[4];
        $city = $addressParts[2];
        $total = $lastUserOrder->total_discounted_price ? $lastUserOrder->total_discounted_price : $lastUserOrder->total_price;
        $phone = $addressParts[5];


        Mail::to($email)->send(new MyTestEmail($name, $deliveryDate, $orderDate, $id, $paymentMethod, $address, $postalCode, $city, $total, $phone));

        session(['checkout_visited' => false]);
        return redirect()->route('thank-you');
    }
}
