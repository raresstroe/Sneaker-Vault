<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::all()->where('is_active', 1);
        $mystery = Product::where('category', 4)->where('is_active', 1)->get();
        $brands = Brand::all();
        $bestseller = Product::where('is_active', 1)->where('is_bestseller', 1)->get();
        $sales = Product::where('is_active', 1)->where('is_sale', 1)->get();

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
        ]);
    }
}
