<?php

namespace App\Http\Controllers;


use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class SearchController extends Controller
{

    public function index(Request $request)
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

        $search = $request->query('search');
        $products = Product::where('is_active', 1)
            ->when($search, function ($query, $search) {
                return $query->whereRaw("MATCH(title) AGAINST (? IN BOOLEAN MODE)", [$search]);
            })
            ->orderByRaw("MATCH(title) AGAINST (? IN BOOLEAN MODE) DESC", [$search])
            ->get();


        $bestseller = Product::where('is_active', 1)->where('is_bestseller', 1)->get();

        return Inertia::render('Search', [
            'products' => $products,
            'bestseller' => $bestseller,
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
