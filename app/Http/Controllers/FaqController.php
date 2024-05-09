<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class FaqController extends Controller
{
    public function index()
    {
        $orderItems = [];
        $total = 0;
        if (Auth::check()) {
            $user = Auth::user();
            $order = Order::where('user_id', $user->id)
                ->where('order_status', 'open')
                ->first();

            $orderItems = [];
            $total = 0;

            if ($order) {
                $orderItems = $order->items()->with('product')->get();
            }
            if ($order->total_discounted_price) {
                $total = $order->total_discounted_price;
            } else {
                $total = $order->total_price;
            }
        }

        return Inertia::render('FAQ', [
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
