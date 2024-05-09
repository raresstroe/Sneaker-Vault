<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class ThankYouController extends Controller
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
                $total = $orderItems->sum(function ($item) {
                    return $item->quantity * $item->product->price;
                });
            }
        }

        return Inertia::render('ThankYou', [
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
