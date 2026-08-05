<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class BlockEnvatoServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Http::macro('preventEnvato', function () {
            Http::fake([
                'envato.codeifly.com/*' => Http::response([
                    'status' => 'success',
                    'main_product_registered' => true,
                    'is_main_product_valid' => true,
                    'multiple_registration' => false,
                    'multiple_registration_modules' => [],
                    'modules_not_registered' => [],
                    'modules' => [],
                    'product' => [
                        'verified' => true,
                        'other_domain_verified' => false,
                        'version' => config('version.current', '4.1.0'),
                        'modules' => [],
                    ],
                ], 200),
            ]);
        });

        Http::preventEnvato();
    }
}