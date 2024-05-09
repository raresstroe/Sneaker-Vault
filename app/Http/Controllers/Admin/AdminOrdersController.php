<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;

class AdminOrdersController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::whereNotNull('shipping_address')->get();

        return Inertia::render('Admin/AdminOrders', ['orders' => $orders]);
    }

    public function status(Request $request, Order $order)
    {
        $order->update(['order_status' => $request->input('order_status')]);

        return redirect()->route('orders.index')->with('success', 'Order status updated successfully.');
    }
    public function delete(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted successfully.');
    }
}
