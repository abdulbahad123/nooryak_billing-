<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$products = \App\Models\Product::whereNull('parent_id')->with(['variations'])->get();
foreach ($products as $p) {
    echo "ID: {$p->id} | Name: {$p->name} | Type: {$p->product_type} | Image: {$p->image} | Variations Count: " . $p->variations->count() . "\n";
    foreach ($p->variations as $v) {
        echo "   -> Variant ID: {$v->id} | Name: {$v->name} | Image: {$v->image}\n";
    }
}
