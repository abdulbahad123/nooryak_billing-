<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Http\Controllers\Api\Front\HomePageController;

$controller = new HomePageController();
try {
    $res = $controller->productDetails('electronifly', '2ab8pdrw');
    $data = json_decode($res->getContent(), true);
    echo "KEYS: " . implode(', ', array_keys($data)) . "\n";
    if (isset($data['data']['product'])) {
        echo "SUCCESS loading product 2ab8pdrw: " . $data['data']['product']['name'] . "\n";
    } else {
        echo "RESPONSE: " . json_encode($data) . "\n";
    }
} catch (\Exception $e) {
    echo "ERROR loading product 2ab8pdrw: " . $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
}
