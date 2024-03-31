<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Inertia::share([
            'auth' => function () {
                if (Auth::user()) {
                    return [
                        'user' => [
                            'id' => Auth::user()->id,
                            'name' => Auth::user()->name,
                            'email' => Auth::user()->email,
                            'admin' => Auth::user()->admin == 1,
                        ],
                    ];
                }

                return ['user' => null];
            },
        ]);
    }
}
