<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class OrdersController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $orders = Order::where('user_id', $user->id)
            ->whereIn('order_status', ['pending', 'delivered'])
            ->get();

        $orderItems = [];
        $total = 0;

        foreach ($orders as $order) {
            $items = $order->items()->with('product')->get();
            $orderItems[$order->id] = $items;
            $total += $items->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });
        }

        return Inertia::render('Dashboard', [
            'orders' => $orders,
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
