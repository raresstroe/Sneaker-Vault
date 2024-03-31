<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RomanianCounty;
use App\Models\RomanianCity;

class CheckoutController extends Controller
{
    public function index()
    {
        session(['checkout_visited' => true]);

        $counties = RomanianCounty::all();
        $data = [];

        foreach ($counties as $county) {
            $cities = RomanianCity::where('county_code', $county->county_code)
                ->pluck('city_name')
                ->toArray();

            $data[$county->county_name] = $cities;
        }

        return Inertia::render('Checkout', ['counties' => $data]);
    }
}
