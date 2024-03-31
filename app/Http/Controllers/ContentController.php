<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Content;

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

        return Inertia::render('Content', [
            'title' => $data[$content]['title'],
            'content' => $data[$content]['content'],
        ]);
    }
}
