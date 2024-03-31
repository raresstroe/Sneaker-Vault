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

        // Log::info($mystery);

        return Inertia::render('Home', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'banners' => $banners,
            'mystery' => $mystery,
            'brands' => $brands
        ]);
    }
}
