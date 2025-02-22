<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Brand;
use App\Models\NewsletterList;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Spatie\Newsletter\Facades\Newsletter;
// use Newsletter;

class HomeController extends Controller
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
            if ($order) {
                if ($order->total_discounted_price != 0) {
                    $total = $order->total_discounted_price;
                } else if ($order->total_price != 0) {
                    $total = $order->total_price;
                }
            }
        }

        $banners = Banner::where('is_active', 1)->get();
        $bannerWithId4 = $banners->firstWhere('id', 4);
        $banners = $banners->where('id', '!=', 4);
        $banners = $banners->shuffle();

        $banners->prepend($bannerWithId4);
        $mystery = Product::where('category', 4)->where('is_active', 1)->get();
        $brands = Brand::all();
        $bestseller = Product::where('is_active', 1)->where('is_bestseller', 1)->inRandomOrder()->get();
        $sales = Product::where('is_active', 1)->where('is_sale', 1)->inRandomOrder()->get();

        // Log::info($mystery);

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'banners' => $banners,
            'mystery' => $mystery,
            'brands' => $brands,
            'bestseller' => $bestseller,
            'sales' => $sales,
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }

    public function subscribe(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|unique:newsletter,email',
        ]);
        // Log::info($validatedData['email']);
        try {
            NewsletterList::create(['email' => $validatedData['email']]);
            Newsletter::subscribe($validatedData['email']);
        } catch (\Exception $e) {
            return redirect()->back();
        }
        return redirect()->back();
    }
}
