<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Illuminate\Support\Collection;

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
                $total = $orderItems->sum(function ($item) {
                    return $item->quantity * $item->product->price;
                });
            }
            if ($order) {
                if ($order->total_discounted_price != 0) {
                    $total = $order->total_discounted_price;
                } else if ($order->total_price != 0) {
                    $total = $order->total_price;
                }
            }
        }

        $type = $request->query('type');

        if ($type) {
            switch ($type) {
                case 'basket':
                    $products = $products->where('type', 'basket');
                    break;
                case 'running':
                    $products = $products->where('type', 'running');
                    break;
                case 'football':
                    $products = $products->where('type', 'football');
                    break;
                default:
                    break;
            }
        }
        
        $products = $products->paginate(24);

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
            'orderItems' => $orderItems,
            'total' => $total,
            'pagination' => [
                'total' => $products->total(),
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem()
            ],
        ]);
    }

    public function sports(Request $request)
    {
        $type = $request->query('type');

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
                if ($order->total_discounted_price) {
                    $total = $order->total_discounted_price;
                } else {
                    $total = $order->total_price;
                }
            }
        }


        return Inertia::render('Sports', [
            'orderItems' => $orderItems,
            'total' => $total,
            'type' => $type,
        ]);
    }
}
