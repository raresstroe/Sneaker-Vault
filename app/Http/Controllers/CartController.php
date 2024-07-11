<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Voucher;
use Illuminate\Support\Str;





class CartController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->where('order_status', 'open')->with('voucher')
            ->first();


        $orderItems = [];
        $total = 0;

        $bestseller = Product::where('is_active', 1)->where('is_bestseller', 1)->inRandomOrder()->get();

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
        return Inertia::render('Cart', [
            'orderItems' => $orderItems,
            'total' => $total,
            'bestseller' => $bestseller,
            'order' => $order,
        ]);
    }


    public function add(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'size' => 'required|string',
                'price' => 'required|numeric|min:0',
            ]);

            $product_id = $request->input('product_id');
            $quantity = $request->input('quantity');
            $size = $request->input('size');
            $price = $request->input('price');
            $total_price = $price * $quantity;

            $user = Auth::user();

            $order = Order::firstOrCreate([
                'user_id' => $user->id,
                'order_status' => 'open',
            ]);

            $orderItem = new OrderItem([
                'product_id' => $product_id,
                'quantity' => $quantity,
                'size' => $size,
                'price' => $price,
                'total_price' => $total_price,
            ]);
            $order->items()->save($orderItem);

            $totalOrderPrice = $order->items()->sum('total_price');
            $order->total_price = $totalOrderPrice;
            $order->save();

            $orderItems = OrderItem::Where('order_id', $order->id);
            $total = $orderItems->sum('total_price');
            // Log::info($total);

            if ($order->voucher_id) {
                $voucher = Voucher::find($order->voucher_id);
                if ($voucher) {
                    if ($voucher->discount_type === 'fixed') {
                        $order->total_discounted_price = $total - $voucher->discount_value;
                    } elseif ($voucher->discount_type === 'percentage') {
                        $discountAmount = ($voucher->discount_value / 100) * $total;
                        $order->total_discounted_price = $total - $discountAmount;
                    }
                }
            } else {
                $order->total_discounted_price = $total;
            }

            $order->total_price = $total;
            $order->save();

            return redirect()->back()->with('success', 'Product added to cart successfully');
        } catch (\Exception $e) {
            Log::error('Error adding product to cart: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error adding product to cart. Please try again.');
        }
    }

    public function remove($id)
    {
        try {
            $orderItem = OrderItem::find($id);

            if (!$orderItem) {
                return redirect()->back()->with('error', 'Order item not found.');
            }

            $order = $orderItem->order;

            $orderItem->delete();

            $total = $order->items()->sum('total_price');

            if ($order->voucher_id) {
                $voucher = Voucher::find($order->voucher_id);
                if ($voucher) {
                    if ($voucher->discount_type === 'fixed') {
                        $order->total_discounted_price = $total - $voucher->discount_value;
                    } elseif ($voucher->discount_type === 'percentage') {
                        $discountAmount = ($voucher->discount_value / 100) * $total;
                        $order->total_discounted_price = $total - $discountAmount;
                    }
                }
            } else {
                $order->total_discounted_price = $total;
            }

            $order->total_price = $total;
            $order->save();

            return redirect()->back()->with('success', 'Product removed from cart successfully');
        } catch (\Exception $e) {
            Log::error('Error removing product from cart: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error removing product from cart. Please try again.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $orderItem = OrderItem::findOrFail($id);
            $quantity = $request->input('quantity');
            $price = $orderItem->product->price;

            $orderItem->update([
                'quantity' => $quantity,
                'total_price' => $price * $quantity,
            ]);

            $order = $orderItem->order;
            $orderItems = OrderItem::Where('order_id', $order->id);
            $total = $orderItems->sum('total_price');
            // Log::info($total);

            if ($order->voucher_id) {
                $voucher = Voucher::find($order->voucher_id);
                if ($voucher) {
                    if ($voucher->discount_type === 'fixed') {
                        $order->total_discounted_price = $total - $voucher->discount_value;
                    } elseif ($voucher->discount_type === 'percentage') {
                        $discountAmount = ($voucher->discount_value / 100) * $total;
                        $order->total_discounted_price = $total - $discountAmount;
                    }
                }
            } else {
                $order->total_discounted_price = $total;
            }

            $order->total_price = $total;
            $order->save();

            return redirect()->back()->with('success', 'Quantity updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating quantity: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error updating quantity. Please try again.');
        }
    }


    public function applyVoucher(Request $request)
    {
        try {
            $request->validate([
                'voucher' => 'required|string',
            ]);

            $voucherCode = Str::lower($request->input('voucher'));

            $voucher = Voucher::whereRaw('LOWER(code) = ?', [$voucherCode])
                ->where('valid_until', '>=', now())
                ->where('is_active', 1)
                ->first();

            if ($voucher) {
                $user = Auth::user();
                $order = Order::where('user_id', $user->id)
                    ->where('order_status', 'open')
                    ->first();

                if ($order) {
                    if ($voucher->discount_type === 'fixed') {
                        $order->total_discounted_price = $order->total_price - $voucher->discount_value;
                    } elseif ($voucher->discount_type === 'percentage') {
                        $discountAmount = ($voucher->discount_value / 100) * $order->total_price;
                        $order->total_discounted_price = $order->total_price - $discountAmount;
                    }

                    $order->voucher_id = $voucher->id;
                    $order->save();

                    return redirect()->back()->with('success', 'Voucher applied successfully');
                } else {
                    return redirect()->back()->with('error', 'No open order found');
                }
            } else {
                return redirect()->back()->with('error', 'Invalid or expired voucher');
            }
        } catch (\Exception $e) {
            Log::error('Error applying voucher: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error applying voucher. Please try again.');
        }
    }
}
