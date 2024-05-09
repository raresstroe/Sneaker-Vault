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
use App\Http\Controllers\Admin\AdminOrdersController;
use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ThankYouController;

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
    Route::post('/profile/update-profile-picture', [ProfileController::class, 'updatePicture'])->name('update-profile-picture');
});

//Index
Route::get('/', [HomeController::class, 'index'])->name('home');

//Categories
Route::get('/categories/{category}', [CategoryController::class, 'index']);
Route::get('/sports', [CategoryController::class, 'sports']);

//Products
Route::get('/products/{product}', [ProductsController::class, 'index']);

//Cart
Route::prefix('cart')->middleware(['auth'])->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart');
    Route::post('/add', [CartController::class, 'add'])->name('cart.add');
    Route::delete('/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::put('/update/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::post('/voucher', [CartController::class, 'applyVoucher'])->name('cart.applyVoucher');
});


//Checkout
Route::prefix('cart/checkout')->middleware(['auth'])->group(function () {
    Route::get('/', [CheckoutController::class, 'index'])->name('checkout');
    Route::post('/addAddress', [CheckoutController::class, 'addAddress']);
    Route::post('/addPayment', [CheckoutController::class, 'addPayment']);
});

//Checkout Summary
Route::prefix('cart/summary')->middleware(['auth'])->group(function () {
    Route::get('/', [SummaryController::class, 'index'])->name('summary');
    Route::post('/send', [SummaryController::class, 'send']);
});


//Favorites
Route::prefix('favorites')->middleware(['auth'])->group(function () {
    Route::get('/', [FavoriteController::class, 'index'])->name('favorites');
    Route::post('/add', [FavoriteController::class, 'add'])->name('favorites.add');
    Route::delete('/remove/{id}', [FavoriteController::class, 'remove'])->name('favorites.remove');
});

//Footer Links
Route::get('/links/faq', [FaqController::class, 'index']);


Route::get('/links/{content}', [ContentController::class, 'index']);

//ThankYou
Route::get('/thank-you', [ThankYouController::class, 'index'])->middleware(['auth'])->name('thank-you');

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

//Admin Users
Route::prefix('admin')->middleware(['admin'])->group(function () {
    Route::get('/users', [AdminUsersController::class, 'index'])->name('users.index');
    Route::put('/users/toggle-admin', [AdminUsersController::class, 'admin']);
    Route::delete('/users/{user}', [AdminUsersController::class, 'delete'])->name('users.delete');
});

//Admin Orders
Route::prefix('admin')->middleware(['admin'])->group(function () {
    Route::get('/orders', [AdminOrdersController::class, 'index'])->name('orders.index');
    Route::put('/orders/status/{order}', [AdminOrdersController::class, 'status']);
    Route::delete('/orders/{order}', [AdminOrdersController::class, 'delete'])->name('orders.delete');
});

//Filepond Routes
Route::post('/upload', [AdminProductsController::class, 'upload']);
Route::delete('/delete', [AdminProductsController::class, 'delete']);
Route::get('/restore', [AdminProductsController::class, 'restore']);
Route::get('/load/{id}', [AdminProductsController::class, 'load']);
Route::delete('/remove/{productId}/{fileName}', [AdminProductsController::class, 'remove']);
