<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SummaryController extends Controller
{
    public function index()
    {
        if (!session('checkout_visited')) {
            return redirect()->route('checkout');
        }

        return Inertia::render('Summary');
    }
}
