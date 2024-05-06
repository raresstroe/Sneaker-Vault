<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $orders = Order::all();
        $monthly_revenue = $orders->where('created_at', '>=', now()->subMonth())->sum('total_price');
        $total_revenue = $orders->sum('total_price');
        $total_orders = $orders->count();
        $monthly_orders = $orders->where('created_at', '>=', now()->subMonth())->count();
        $total_customers = $orders->groupBy('user_id')->count();
        $monthly_customers = $orders->where('created_at', '>=', now()->subMonth())->groupBy('user_id')->count();

        $county_counts = [];
        $city_counts = [];

        foreach ($orders as $order) {
            $shipping_address = $order->shipping_address;

            $address_parts = explode(";", $shipping_address);

            $county = $address_parts[1];
            $city = $address_parts[2];

            if (isset($city_counts[$city])) {
                $city_counts[$city]++;
            } else {
                $city_counts[$city] = 1;
            }

            if (isset($county_counts[$county])) {
                $county_counts[$county]++;
            } else {
                $county_counts[$county] = 1;
            }
        }

        arsort($city_counts);
        $most_popular_city = key($city_counts);

        arsort($county_counts);
        $most_popular_county = key($county_counts);

        return Inertia::render('Admin/AdminDashboard', [
            'user' => $user,
            'orders' => $orders,
            'monthly_revenue' => $monthly_revenue,
            'total_revenue' => $total_revenue,
            'total_orders' => $total_orders,
            'monthly_orders' => $monthly_orders,
            'total_customers' => $total_customers,
            'monthly_customers' => $monthly_customers,
            'most_popular_city' => $most_popular_city,
            'most_popular_county' => $most_popular_county,
        ]);
    }
}
