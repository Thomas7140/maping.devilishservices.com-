<?php
header('Content-Type: application/json; charset=utf-8');
$root = realpath(__DIR__ . '/../../resources/3d_items');
if (!$root || !is_dir($root)) {
  echo json_encode(['ok'=>false,'error'=>'resources/3d_items folder not found','path'=>__DIR__ . '/../../resources/3d_items'], JSON_PRETTY_PRINT);
  exit;
}
$files = glob($root . '/*.glb') ?: [];
$names = array_map('basename', $files);
natcasesort($names);
$required = ['Armry01.glb','Armry02.glb','Armry03.glb','Wbarack1.glb','MogHng01.glb','Cargo02.glb'];
$missing = [];
$lower = array_change_key_case(array_flip($names), CASE_LOWER);
foreach ($required as $r) {
  if (!isset($lower[strtolower($r)])) $missing[] = $r;
}
echo json_encode([
  'ok' => true,
  'path' => $root,
  'glb_count' => count($files),
  'required_missing' => $missing,
  'sample' => array_slice(array_values($names), 0, 80),
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
