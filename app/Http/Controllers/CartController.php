<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('order_status', 'open')
            ->first();

        $orderItems = [];
        $total = 0;

        $bestseller = Product::where('is_active', 1)->where('is_bestseller', 1)->get();

        if ($order) {
            $orderItems = $order->items()->with('product')->get();
            $total = $orderItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });
        }

        return Inertia::render('Cart', [
            'orderItems' => $orderItems,
            'total' => $total,
            'bestseller' => $bestseller,
        ]);
    }


    public function add(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'size' => 'required|string',
                'price' => 'required|numeric|min:0',
            ]);

            $product_id = $request->input('product_id');
            $quantity = $request->input('quantity');
            $size = $request->input('size');
            $price = $request->input('price');
            $total_price = $price * $quantity;

            $user = Auth::user();

            $order = Order::firstOrCreate([
                'user_id' => $user->id,
                'order_status' => 'open',
            ]);

            $orderItem = new OrderItem([
                'product_id' => $product_id,
                'quantity' => $quantity,
                'size' => $size,
                'price' => $price,
                'total_price' => $total_price,
            ]);
            $order->items()->save($orderItem);

            $totalOrderPrice = $order->items()->sum('total_price');
            $order->total_price = $totalOrderPrice;
            $order->save();

            return redirect()->back()->with('success', 'Product added to cart successfully');
        } catch (\Exception $e) {
            Log::error('Error adding product to cart: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error adding product to cart. Please try again.');
        }
    }

    public function remove($id)
    {
        try {
            $orderItem = OrderItem::find($id);

            if (!$orderItem) {
                return redirect()->back()->with('error', 'Order item not found.');
            }

            $order = $orderItem->order;

            $orderItem->delete();

            $total = $order->items()->sum('total_price');

            $order->total_price = $total;
            $order->save();

            return redirect()->back()->with('success', 'Product removed from cart successfully');
        } catch (\Exception $e) {
            Log::error('Error removing product from cart: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error removing product from cart. Please try again.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $orderItem = OrderItem::findOrFail($id);
            $quantity = $request->input('quantity');
            $price = $orderItem->price;


            $orderItem->update([
                'quantity' => $quantity,
                'total_price' => $price * $request->input('quantity'),
            ]);

            $order = $orderItem->order;

            $total = $order->items()->sum('total_price');

            $order->total_price = $total;
            $order->save();
            return redirect()->back()->with('success', 'Quantity updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating quantity: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error updating quantity. Please try again.');
        }
    }
}
