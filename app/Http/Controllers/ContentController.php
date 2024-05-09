<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Content;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class ContentController extends Controller
{

    public function index($content)
    {
        $types = ['terms', 'policy', 'return', 'shipment'];
        $data = [];

        foreach ($types as $type) {
            $contentItem = Content::where('type', $type)->first();
            $data[$type] = [
                'title' => $contentItem->title,
                'content' => $contentItem->content,
            ];
        }

        if (!isset($data[$content])) {
            abort(404);
        }

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

        return Inertia::render('Content', [
            'title' => $data[$content]['title'],
            'content' => $data[$content]['content'],
            'order' => $order,
            'orderItems' => $orderItems,
            'total' => $total,
        ]);
    }
}
