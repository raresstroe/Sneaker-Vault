<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    public function index($product)
    {

        $product_id = (int) substr($product, strrpos($product, '-') + 1);

        $product_data = Product::where('id', $product_id)->firstOrFail();
        // Log::info($product_data);

        $similiar_products = Product::where('category', $product_data->category)->where('id', '!=', $product_id)->get();
        // Log::info($similiar_products);

        $images = ProductImage::where('product_id', $product_id)->get();
        // Log::info($images);

        $brand = null;
        $brand_text = null;

        if ($product_data->brand) {
            $brand = Brand::where('id', $product_data->brand)->first();
            $brand_text = $brand->description ?? null;
        }

        $data = [
            'array' => [
                [
                    'id' => $product_id,
                    'pics' => array_merge(
                        [$product_data->id => $product_data->img_src],
                        $images->mapWithKeys(function ($image) {
                            return [$image->id => $image->image_path];
                        })->toArray()
                    ),
                    'title' => $product_data->title,
                    'brand' => $brand ? $brand->picture : null,
                    'size' => $product_data->size,
                    'label' => $product_data->label,
                    'short_description' => $product_data->short_description,
                    'price' => $product_data->price,
                    'long_description' => $product_data->long_description,
                    'brand_text' => $brand_text,
                    'category' => $product_data->category,
                ],
            ],
        ];

        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('order_status', 'open')
            ->first();

        $orderItems = [];
        $total = 0;

        if ($order) {
            $orderItems = $order->items()->with('product')->get();
            $total = $orderItems->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });
        }


        return Inertia::render('Product', [
            'array' => $data['array'],
            'similiar_products' => $similiar_products,
            'order' => $order,
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
