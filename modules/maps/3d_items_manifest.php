<?php
header('Content-Type: application/json; charset=utf-8');
$root = realpath(__DIR__ . '/../../resources/3d_items');
$out = [];
if ($root && is_dir($root)) {
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));
    foreach ($it as $file) {
        if (!$file->isFile()) continue;
        $name = $file->getFilename();
        if (!preg_match('/\.glb$/i', $name)) continue;
        $base = preg_replace('/\.glb$/i', '', $name);
        $lower = strtolower($base);
        $compact = preg_replace('/[^a-z0-9]/', '', $lower);
        $out[$lower] = $name;
        if ($compact) $out[$compact] = $name;
    }
}
echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
