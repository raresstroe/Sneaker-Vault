<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Mail\MyTestEmail;
use Illuminate\Support\Facades\Mail;

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
        $order->order_status = 'pending';
        $order->save();
        $name = $user->name;
        $email = $user->email;

        Mail::to($email)->send(new MyTestEmail($name));

        session(['checkout_visited' => false]);
        return redirect()->route('thank-you');
    }
}
