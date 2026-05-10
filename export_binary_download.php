<?php
declare(strict_types=1);

require_once __DIR__ . '/modules/auth/bootstrap.php';

try {
    $user = maping_require_auth();
    $file = (string)($_GET['file'] ?? '');
    $file = str_replace('\\', '/', rawurldecode($file));
    $file = ltrim($file, '/');
    if ($file === '' || !preg_match('/\.bms$/i', $file)) {
        maping_json_response(['success' => false, 'error' => 'Invalid BMS download file'], 400);
    }
    if (str_contains($file, '..') || !str_starts_with($file, 'completed-maps/')) {
        maping_json_response(['success' => false, 'error' => 'Invalid BMS download path'], 400);
    }

    $uploadInfo = maping_user_upload_dir($user);
    $folderName = maping_safe_path_segment((string)$uploadInfo['display_name'], (string)$user['id']);
    $allowedPrefix = 'completed-maps/' . $folderName . '/';
    if (!str_starts_with($file, $allowedPrefix)) {
        maping_json_response(['success' => false, 'error' => 'Access denied for this BMS file'], 403);
    }

    $absolute = maping_project_root() . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $file);
    if (!is_file($absolute) || !is_readable($absolute)) {
        maping_json_response(['success' => false, 'error' => 'BMS file not found'], 404);
    }

    $filename = basename($absolute);
    // Force a single .bms suffix. This prevents accidental names like map.bmp.bms
    // from being shown/downloaded as a bitmap by some systems.
    $downloadBase = preg_replace('/\.(mis|bms|bmp)$/i', '', $filename);
    $downloadBase = preg_replace('/\.(mis|bms|bmp)$/i', '', (string)$downloadBase);
    $filename = ($downloadBase !== '' ? $downloadBase : 'mission') . '.bms';
    header('Content-Type: application/x-bms');
    header('Content-Length: ' . (string)filesize($absolute));
    header('Content-Disposition: attachment; filename="' . addcslashes($filename, '"\\') . '"; filename*=UTF-8\'\'' . rawurlencode($filename));
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    readfile($absolute);
    exit;
} catch (Throwable $exception) {
    maping_json_response(['success' => false, 'error' => $exception->getMessage()], 500);
}
