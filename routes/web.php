<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\SummaryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\Admin\AdminProductsController;
use App\Http\Controllers\Admin\AdminBannersController;
use App\Http\Controllers\HomeController;

require __DIR__ . '/auth.php';

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// Breeze
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/orders', [OrdersController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Index
Route::get('/', [HomeController::class, 'index'])->name('home');

//Categories
Route::get('/categories/{category}', [CategoryController::class, 'index']);

//Products
Route::get('/products/{product}', [ProductsController::class, 'index']);

//Cart
Route::get('/cart', [CartController::class, 'index'])->middleware(['auth'])->name('cart');

//Checkout
Route::get('/cart/checkout', [CheckoutController::class, 'index'])->middleware(['auth'])->name('checkout');

//Checkout Summary
Route::get('/cart/summary', [SummaryController::class, 'index'])->middleware(['auth'])->name('summary');

//Favorites
Route::get('/favorites', [FavoriteController::class, 'index'])->middleware(['auth'])->name('favorites');

//Footer Links
Route::inertia('/links/faq', 'FAQ');

Route::get('/links/{content}', [ContentController::class, 'index']);


//Admin

//Admin Products
Route::prefix('admin')->middleware(['admin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/products', [AdminProductsController::class, 'index'])->name('products.index');
    Route::post('/products', [AdminProductsController::class, 'add']);
    Route::post('/products/{product}', [AdminProductsController::class, 'update']);
    Route::delete('/products/{product}', [AdminProductsController::class, 'destroy']);
});

//Admin Banners
Route::prefix('admin')->middleware(['admin'])->group(function () {
    Route::get('/banners', [AdminBannersController::class, 'index'])->name('banners.index');
    Route::post('/banners', [AdminBannersController::class, 'add']);
    Route::post('/banners/{banner}', [AdminBannersController::class, 'update']);
    Route::delete('/banners/{banner}', [AdminBannersController::class, 'destroy']);
});

//Filepond Routes
Route::post('/upload', [AdminProductsController::class, 'upload']);
Route::delete('/delete', [AdminProductsController::class, 'delete']);
Route::get('/restore', [AdminProductsController::class, 'restore']);
Route::get('/load/{id}', [AdminProductsController::class, 'load']);
Route::delete('/remove/{productId}/{fileName}', [AdminProductsController::class, 'remove']);
