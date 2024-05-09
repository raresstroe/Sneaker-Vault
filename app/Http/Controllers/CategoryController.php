<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class CategoryController extends Controller
{
    public function index($category, Request $request)
    {
        $filters = [];

        switch ($category) {
            case 'men':
                $products = Product::where('category', 1);
                $categoryName = 'Barbati';
                break;
            case 'woman':
                $products = Product::where('category', 2);
                $categoryName = 'Femei';
                break;
            case 'kids':
                $products = Product::where('category', 3);
                $categoryName = 'Copii';
                break;
            case 'mystery':
                $products = Product::where('category', 4);
                $categoryName = 'Mystery Vaults';
                break;
            case 'football':
                $products = Product::where('category', 5);
                $categoryName = 'Fotbal';
                break;
            case 'running':
                $products = Product::where('category', 6);
                $categoryName = 'Alergare';
                break;
            case 'basketball':
                $products = Product::where('category', 7);
                $categoryName = 'Basketball';
                break;
            default:
                abort(404);
        }

        $brands = Brand::all();

        $sort = $request->query('sort');
        switch ($sort) {
            case 'all':
                break;
            case 'new':
                $products = $products->orderByDesc('id');
                break;
            case 'desc':
                $products = $products->orderByDesc('price');
                break;
            case 'asc':
                $products = $products->orderBy('price');
                break;
            default:
        }

        $filter = $request->query('filter');

        if ($filter) {
            $filters = explode(',', $filter);

            $products = $products->where(function ($query) use ($filters) {
                $query->where(function ($query) use ($filters) {
                    foreach ($filters as $f) {
                        $f = trim($f);
                        if (empty($f)) {
                            continue;
                        }

                        switch ($f) {
                            case 'sale':
                                $query->where('is_sale', true);
                                break;
                            case 'bestseller':
                                $query->Where('is_bestseller', true);
                                break;
                            default:
                                if (is_numeric($f)) {
                                    $query->WhereRaw("FIND_IN_SET('$f', size)");
                                } else {
                                    $brandId = Brand::where('value', $f)->value('id');
                                    if ($brandId) {
                                        $query->Where('brand', $brandId);
                                    }
                                }
                        }
                    }
                });
            });
        }
        // Log::info($products->toSql());
        $products = $products->paginate(25);

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

        return Inertia::render('Categories', [
            'title' => 'Incaltaminte ' . $categoryName,
            'category' => $category,
            'array' => $products->map(function ($product) {
                return [
                    'index' => $product->id,
                    'imgSrc' => $product->img_src,
                    'title' => $product->title,
                    'label' => $product->label,
                    'price' => "Pret: {$product->price} RON",
                    'href' => $product->href,
                ];
            }),
            'brands' => $brands,
            'filters' => $filters,
            'order' => $order,
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
