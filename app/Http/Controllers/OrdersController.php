<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class OrdersController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $delivered_orders = Order::where('user_id', $userId)
            ->where('order_status', 'Livrat')
            ->with(['items.product'])
            ->get();

        $delivered_products = [];
        foreach ($delivered_orders as $order) {
            foreach ($order->items as $item) {
                $delivered_products[] = $item->product;
            }
        }
        // Log::info($delivered_orders->toArray());

        return Inertia::render('Dashboard', [
            'delivered_orders' => $delivered_orders,
            'delivered_products' => $delivered_products
        ]);
    }
}
