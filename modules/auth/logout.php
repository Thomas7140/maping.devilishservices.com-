<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

maping_require_method('POST');

maping_start_session();
$_SESSION = [];

if (session_status() === PHP_SESSION_ACTIVE) {
    $params = session_get_cookie_params();
    if (ini_get('session.use_cookies')) {
        setcookie(session_name(), '', [
            'expires' => time() - 42000,
            'path' => $params['path'] ?? '/',
            'domain' => $params['domain'] ?? '',
            'secure' => (bool) ($params['secure'] ?? false),
            'httponly' => (bool) ($params['httponly'] ?? true),
            'samesite' => $params['samesite'] ?? 'Lax',
        ]);
    }
    session_destroy();
}

maping_json_response([
    'success' => true,
    'message' => 'Logged out',
    'authenticated' => false,
]);
