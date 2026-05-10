<?php
declare(strict_types=1);

require_once __DIR__ . '/modules/auth/bootstrap.php';
require_once __DIR__ . '/modules/maps/bms_export_history.php';

maping_require_method('POST');

function maping_bms_fixed(string $value, int $len): string {
    $value = mb_convert_encoding($value, 'Windows-1252', 'UTF-8, Windows-1252, ISO-8859-1');
    $value = substr($value, 0, max(0, $len - 1));
    return str_pad($value, $len, "\0");
}
function maping_bms_u8(int $v): string { return pack('C', $v & 0xff); }
function maping_bms_u16(int $v): string { return pack('v', $v & 0xffff); }
function maping_bms_u32(int $v): string { return pack('V', $v); }
function maping_bms_i16(int $v): string { return pack('v', $v & 0xffff); }
function maping_bms_i32(int $v): string { return pack('V', $v & 0xffffffff); }
function maping_bms_f32(float $v): string { return pack('g', $v); }
function maping_bms_num(string $text, string $key, int|float $default = 0): int|float {
    if (preg_match('/^\s*' . preg_quote($key, '/') . '\s+(-?\d+(?:\.\d+)?)/mi', $text, $m)) {
        return str_contains($m[1], '.') ? (float) $m[1] : (int) $m[1];
    }
    return $default;
}
function maping_bms_string(string $text, string $key, string $default = ''): string {
    if (preg_match('/^\s*' . preg_quote($key, '/') . '\s+"([^"]*)"/mi', $text, $m)) return $m[1];
    if (preg_match('/^\s*' . preg_quote($key, '/') . '\s+([^\r\n]+)/mi', $text, $m)) return trim($m[1]);
    return $default;
}
function maping_bms_section(string $text, string $kind): array {
    $items = [];
    if (preg_match_all('/^\s*begin\s+' . preg_quote($kind, '/') . '(?:\s+(\S+))?\s*\R(.*?)^\s*end\s+' . preg_quote($kind, '/') . '\s*$/ims', $text, $m, PREG_SET_ORDER)) {
        foreach ($m as $block) $items[] = ['id' => trim((string)($block[1] ?? '')), 'body' => (string)$block[2]];
    }
    return $items;
}
function maping_bms_parse_ints(string $body, string $key, int $max = 3): array {
    if (!preg_match('/^\s*' . preg_quote($key, '/') . '\s+([^\r\n]+)/mi', $body, $m)) return [];
    preg_match_all('/-?\d+(?:\.\d+)?/', $m[1], $nums);
    return array_slice(array_map(static fn($v) => (int) round((float)$v), $nums[0] ?? []), 0, $max);
}
function maping_bms_item_record(array $parsed, string $category = 'item'): string {
    $body = $parsed['body'];
    $typeId = (int) maping_bms_num($body, 'type_id', 0);
    $id = (int) maping_bms_num($body, 'id', is_numeric($parsed['id']) ? (int)$parsed['id'] : 0);
    $attr = (int) maping_bms_num($body, 'bmsi_attributes', (int) maping_bms_num($body, 'attrib', 0));
    $pos = maping_bms_parse_ints($body, 'position', 3);
    $x = $pos[0] ?? 0; $y = $pos[1] ?? 0; $z = $pos[2] ?? 0;
    $face = maping_bms_parse_ints($body, 'facing', 3);
    $yaw = $face[0] ?? 0; $pitch = $face[1] ?? 0; $roll = $face[2] ?? 0;
    $group = (int) maping_bms_num($body, 'group', 0);
    $layer = (int) maping_bms_num($body, 'layer', $category === 'building' ? 4 : ($category === 'marker' ? 8 : 6));
    $wp = (int) maping_bms_num($body, 'waypoint', 0);
    $name1 = maping_bms_string($body, 'iai_name', maping_bms_string($body, 'name', ''));
    $name2 = maping_bms_string($body, 'ai_textfile', '');
    $gen = maping_bms_string($body, 'gen_string', 'null');
    $rec = '';
    $rec .= maping_bms_i32($typeId);
    $rec .= maping_bms_i32((int) maping_bms_num($body, 'name_index', 0));
    $rec .= maping_bms_i32($id);
    $rec .= maping_bms_u32($attr);
    $rec .= maping_bms_i32($x) . maping_bms_i32($y) . maping_bms_i32($z);
    $rec .= maping_bms_i32((int) maping_bms_num($body, 'wpdistance', 0));
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'waccuracy1', 0));
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'waccuracy2', 0));
    $rec .= maping_bms_i32((int) maping_bms_num($body, 'perception2', 0));
    $rec .= maping_bms_i32((int) maping_bms_num($body, 'perfectionist2', 0));
    $ed = maping_bms_parse_ints($body, 'edistances', 2);
    $rec .= maping_bms_i32($ed[0] ?? 0) . maping_bms_i32($ed[1] ?? 0);
    $rec .= maping_bms_i32($wp);
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'fov', 0));
    $rec .= maping_bms_i16($yaw);
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'crouchtimer', 0));
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'shoottimer', 0));
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'attention', 0));
    $rec .= maping_bms_i16($pitch) . maping_bms_i16($roll);
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'spawns', 0));
    $rec .= maping_bms_u8((int) maping_bms_num($body, 'team', 0));
    $rec .= maping_bms_u8($group);
    $rec .= maping_bms_u8($wp);
    $rec .= maping_bms_u8((int) maping_bms_num($body, 'obliqueness', 0));
    $rec .= maping_bms_i16((int) maping_bms_num($body, 'map_symbol', 0));
    $rec .= str_repeat("\0", 6);
    $rec .= maping_bms_i32((int) maping_bms_num($body, 'advancetimer', 0));
    $rec .= str_repeat("\0", 28);
    $rec .= maping_bms_fixed($name1, 8);
    $rec .= maping_bms_fixed($name2, 8);
    $rec .= maping_bms_fixed($gen, 36);
    $rec .= maping_bms_i32((int) maping_bms_num($body, 'max_attack_distance', 16));
    $rec .= str_repeat("\0", 20);
    return str_pad(substr($rec, 0, 176), 176, "\0");
}
function maping_mis_to_bms(string $mis, string $filename): string {
    $gi = maping_bms_section($mis, 'general_information')[0]['body'] ?? '';
    $allItems = maping_bms_section($mis, 'item');
    $items = $buildings = $markers = $people = [];
    foreach ($allItems as $it) {
        $body = $it['body'];
        $layer = (int) maping_bms_num($body, 'layer', 0);
        $name = strtolower(maping_bms_string($body, 'name', ''));
        if ($layer === 4 || str_contains($name, 'building') || str_contains($name, 'hut') || str_contains($name, 'bld')) $buildings[] = $it;
        elseif ($layer === 8 || str_contains($name, 'marker') || str_contains($name, 'waypoint')) $markers[] = $it;
        elseif ($layer === 3 || str_contains($name, 'soldier') || str_contains($name, 'person')) $people[] = $it;
        else $items[] = $it;
    }
    $header = '';
    $header .= maping_bms_fixed('BMS', 4);
    $header .= maping_bms_fixed(maping_bms_string($gi, 'name', pathinfo($filename, PATHINFO_FILENAME)), 32);
    $header .= maping_bms_fixed(maping_bms_string($gi, 'designer', ''), 32);
    $header .= maping_bms_fixed(maping_bms_string($gi, 'terrain', ''), 48);
    $header .= maping_bms_fixed('', 16);
    $header .= maping_bms_u32((int) maping_bms_num($gi, 'climate', 0));
    $header .= maping_bms_u32((int) maping_bms_num($gi, 'attrib', 0));
    $header .= str_repeat("\0", 12);
    $header .= maping_bms_u16((int) maping_bms_num($gi, 'water_level', 0));
    $header .= maping_bms_u32(0);
    $header .= maping_bms_u16((int) maping_bms_num($gi, 'fog_level', 0));
    $fog = maping_bms_parse_ints($gi, 'fog_color', 3);
    $header .= maping_bms_u8($fog[0] ?? 50) . maping_bms_u8($fog[1] ?? 50) . maping_bms_u8($fog[2] ?? 50) . maping_bms_u8(0);
    $header .= maping_bms_u32(count($items)) . maping_bms_u32(count($buildings)) . maping_bms_u32(count($markers)) . maping_bms_u32(count($people));
    $header .= maping_bms_u32(0);
    $header .= maping_bms_u32((int) maping_bms_num($gi, 'weather_type', 0));
    $win = maping_bms_parse_ints($gi, 'subgoals_win', 8); $lose = maping_bms_parse_ints($gi, 'subgoals_lose', 8);
    for ($i=0;$i<8;$i++) $header .= maping_bms_u8($win[$i] ?? 0);
    for ($i=0;$i<8;$i++) $header .= maping_bms_u8($lose[$i] ?? 0);
    $header .= str_repeat("\0", 16);
    $header .= maping_bms_fixed(maping_bms_string($gi, 'sunset', maping_bms_string($gi, 'environment', '')), 16);
    $header .= str_repeat("\0", 10);
    $header .= maping_bms_u8(0) . maping_bms_u8(0) . maping_bms_u8(0);
    $header .= maping_bms_u16(0) . maping_bms_u8(0);
    $wind = maping_bms_parse_ints($gi, 'wind', 2);
    $header .= maping_bms_u32($wind[0] ?? 0) . maping_bms_u32($wind[1] ?? 0);
    $header .= str_repeat("\0", 4);
    $header .= maping_bms_u32(0) . maping_bms_u32(0) . maping_bms_u32(0) . maping_bms_u32(0);
    $header .= maping_bms_fixed(maping_bms_string($gi, 'Terrain_tile_tga', ''), 16);
    $brief = maping_bms_section($mis, 'briefing')[0]['body'] ?? maping_bms_string($gi, 'briefing', '');
    $brief = trim(preg_replace('/^\s*(text|briefing)\s+/mi', '', $brief));
    $header .= maping_bms_fixed($brief, 256);
    $header .= maping_bms_i16(0);
    $header .= maping_bms_u8((int) maping_bms_num($gi, 'Player_Type', 0));
    $header .= maping_bms_u8((int) maping_bms_num($gi, 'Max_Saves', 0));
    $header .= str_repeat("\0", 16);
    $header .= maping_bms_f32((float) maping_bms_num($gi, 'Map_Zoom', 0.001));
    $header .= maping_bms_i16(count(maping_bms_section($mis, 'areatrig')));
    $header .= maping_bms_u16(0); // weapon loadout chunk length
    $header .= maping_bms_u16((int) maping_bms_num($gi, 'bonus_expiration', 0));
    $header .= maping_bms_u16(0) . maping_bms_u16(0) . maping_bms_u16(0);
    $header .= str_repeat("\0", 28);
    $header = str_pad(substr($header, 0, 616), 616, "\0");
    $out = $header;
    foreach ($items as $it) $out .= maping_bms_item_record($it, 'item');
    foreach ($buildings as $it) $out .= maping_bms_item_record($it, 'building');
    foreach ($markers as $it) $out .= maping_bms_item_record($it, 'marker');
    foreach ($people as $it) $out .= maping_bms_item_record($it, 'organic');
    $out .= str_repeat("\0", 128 * 136); // waypoint records
    $out .= str_repeat("\0", 64 * 32);   // groups
    $out .= str_repeat("\0", 32 * 20);   // layers
    // area trigger records intentionally omitted unless exact corners are implemented
    $out .= maping_bms_i32(0) . maping_bms_i32(0) . maping_bms_i32(0); // event/trigger/action counts
    $out .= maping_bms_i32(0); // bounding box count
    return $out;
}
function maping_public_path_url(string $relativePath): string {
    $parts = array_map('rawurlencode', explode('/', str_replace('\\', '/', $relativePath)));
    return implode('/', $parts);
}

try {
    $user = maping_require_auth();
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') maping_json_response(['success' => false, 'error' => 'Empty request body'], 400);
    if (strlen($raw) > 25 * 1024 * 1024) maping_json_response(['success' => false, 'error' => 'Map content is too large'], 413);
    $data = json_decode($raw, true);
    if (!is_array($data)) maping_json_response(['success' => false, 'error' => 'Invalid JSON'], 400);
    $filename = basename(str_replace('\\', '/', (string)($data['filename'] ?? 'edited.mis')));
    if (!preg_match('/\.mis$/i', $filename)) $filename .= '.mis';
    $content = (string)($data['content'] ?? '');
    if ($content === '') maping_json_response(['success' => false, 'error' => 'Map content is required'], 422);

    $uploadInfo = maping_user_upload_dir($user);
    $folderName = maping_safe_path_segment((string)$uploadInfo['display_name'], (string)$user['id']);
    $completedAbs = maping_project_root() . DIRECTORY_SEPARATOR . 'completed-maps' . DIRECTORY_SEPARATOR . $folderName;
    $completedRel = 'completed-maps/' . $folderName;
    maping_ensure_directory(maping_project_root() . DIRECTORY_SEPARATOR . 'completed-maps');
    maping_ensure_directory($completedAbs);

    // Normalize the export name aggressively. Browsers/OSes can get confused if the
    // requested name contains an old extension like .bmp/.mis before the final suffix.
    // Always save exactly: <clean map base>.bms
    $base = basename(str_replace('\\', '/', $filename));
    $base = preg_replace('/\.(mis|bms|bmp)$/i', '', $base);
    $base = preg_replace('/\.(mis|bms|bmp)$/i', '', (string)$base);
    $base = trim((string)$base);
    if ($base === '') $base = 'mission';
    $storedFileName = $base . '.bms';
    $storedFileName = basename(str_replace('\\', '/', $storedFileName));
    $storedAbs = $completedAbs . DIRECTORY_SEPARATOR . $storedFileName;
    $storedRel = $completedRel . '/' . $storedFileName;

    $bms = maping_mis_to_bms($content, $filename);
    $bytes = file_put_contents($storedAbs, $bms, LOCK_EX);
    if ($bytes === false) throw new RuntimeException('Could not write exported BMS file');

    maping_record_bms_export(
        (string) $user['id'],
        (string) $uploadInfo['display_name'],
        $filename,
        $storedFileName,
        $storedRel,
        $storedAbs,
        (int) $bytes
    );

    maping_json_response([
        'success' => true,
        'filename' => $storedFileName,
        'bytes' => $bytes,
        'path' => $storedRel,
        'download_url' => 'export_binary_download.php?file=' . rawurlencode($storedRel),
        'message' => 'Binary mission exported successfully',
    ]);
} catch (Throwable $exception) {
    maping_json_response(['success' => false, 'error' => $exception->getMessage()], 500);
}
