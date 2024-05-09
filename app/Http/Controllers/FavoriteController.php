<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Product;


class FavoriteController extends Controller
{
    public function index()
    {
        $orderItems = [];
        $total = 0;
        $user = Auth::user();
        if (Auth::check()) {
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

        $favorites = Favorite::where('user_id', $user->id)->with('product')->get();

        $bestseller = Product::where('is_active', 1)->where('is_bestseller', 1)->get();

        return Inertia::render('Favorite', [
            'favorites' => $favorites,
            'orderItems' => $orderItems,
            'total' => $total,
            'bestseller' => $bestseller,
        ]);
    }
    public function add(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'size' => 'required|string',
            ]);

            $product_id = $request->input('product_id');
            $size = $request->input('size');

            $user = Auth::user();

            $favorite = Favorite::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
                'size' => $size,
            ]);

            $favorite->save();

            return redirect()->back()->with('success', 'Product added to favorites successfully');
        } catch (\Exception $e) {
            Log::error('Error adding product to favorites: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error adding product to favorites. Please try again.');
        }
    }

    public function remove($id)
    {
        try {
            $favoriteItem = Favorite::find($id);

            if (!$favoriteItem) {
                return redirect()->back()->with('error', 'Item not found.');
            }

            $favoriteItem->delete();

            return redirect()->back()->with('success', 'Product removed from favorites successfully');
        } catch (\Exception $e) {
            Log::error('Error removing product from favorites: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error removing product from favorites. Please try again.');
        }
    }
}
