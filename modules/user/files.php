<?php
declare(strict_types=1);
session_start();
header('Content-Type: application/json; charset=utf-8');
$root = dirname(__DIR__, 2);
function username(): string {
    foreach (['username','user_name','name','email'] as $key) {
        if (!empty($_SESSION[$key])) return preg_replace('/[^A-Za-z0-9._@-]+/', '_', (string)$_SESSION[$key]);
    }
    if (!empty($_SESSION['user_id'])) return 'user_' . preg_replace('/[^A-Za-z0-9._-]+/', '_', (string)$_SESSION['user_id']);
    return 'guest';
}
$user = username();
$out = [];
foreach (['uploads','converted-maps','completed-maps'] as $folder) {
    $dir = $root . '/' . $folder . '/' . $user;
    if (!is_dir($dir)) continue;
    foreach (glob($dir . '/*.{mis,bms,til}', GLOB_BRACE) ?: [] as $file) {
        $out[] = [
            'filename' => basename($file),
            'extension' => strtolower(pathinfo($file, PATHINFO_EXTENSION)),
            'folder' => $folder . '/' . $user,
            'size' => filesize($file),
            'modified' => date('Y-m-d H:i:s', filemtime($file)),
        ];
    }
}
echo json_encode(['ok'=>true,'username'=>$user,'files'=>$out], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
