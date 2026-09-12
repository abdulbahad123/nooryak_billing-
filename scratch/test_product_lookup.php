<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Classes\Common;
use App\Models\Product;

function safeGetIdFromHash($hash) {
    if ($hash != "") {
        $convertedId = Hashids::decode($hash);
        if (!empty($convertedId) && isset($convertedId[0])) {
            return $convertedId[0];
        }
    }
    return $hash;
}

$hash = '2ab8pdrw';
$decoded = safeGetIdFromHash($hash);
echo "Hash '{$hash}' decoded to: " . var_export($decoded, true) . "\n";

$product = Product::where('id', $decoded)->orWhere('slug', $hash)->first();
echo "Product found by hash: " . ($product ? $product->name : 'NONE') . "\n";

$allProducts = Product::whereNull('parent_id')->take(5)->get();
foreach ($allProducts as $p) {
    echo "ID: {$p->id} | Slug: {$p->slug} | XID: {$p->xid}\n";
}
