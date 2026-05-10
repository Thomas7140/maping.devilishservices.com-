<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    maping_json_response([
        'success' => false,
        'error' => 'GET required',
    ], 405);
}

$user = maping_current_user();

maping_json_response([
    'success' => true,
    'authenticated' => is_array($user),
    'user' => is_array($user) ? maping_public_user($user) : null,
]);
