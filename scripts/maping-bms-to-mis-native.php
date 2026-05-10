<?php
declare(strict_types=1);

if (PHP_SAPI !== 'cli') { fwrite(STDERR, "CLI only\n"); exit(64); }
if ($argc !== 3) { fwrite(STDERR, "Usage: php maping-bms-to-mis-native.php <input.bms> <output.mis>\n"); exit(64); }
$input = $argv[1]; $output = $argv[2];
if (!is_file($input)) { fwrite(STDERR, "Input BMS file not found: {$input}\n"); exit(66); }
$data = file_get_contents($input);
if ($data === false || strlen($data) < 616 || substr($data, 0, 3) !== 'BMS') { fwrite(STDERR, "Invalid or unsupported BMS file\n"); exit(65); }

final class BmsReader {
    public string $d; public int $p = 0; public int $n;
    public function __construct(string $d) { $this->d = $d; $this->n = strlen($d); }
    public function need(int $len): void { if ($this->p + $len > $this->n) throw new RuntimeException('Unexpected end of BMS at offset ' . $this->p); }
    public function bytes(int $len): string { $this->need($len); $s = substr($this->d, $this->p, $len); $this->p += $len; return $s; }
    public function fixed(int $len): string { $s = $this->bytes($len); $z = strpos($s, "\0"); if ($z !== false) $s = substr($s, 0, $z); return $s; }
    public function u8(): int { $this->need(1); return ord($this->d[$this->p++]); }
    public function i16(): int { $v = unpack('v', $this->bytes(2))[1]; return $v >= 0x8000 ? $v - 0x10000 : $v; }
    public function u16(): int { return unpack('v', $this->bytes(2))[1]; }
    public function i32(): int { $v = unpack('V', $this->bytes(4))[1]; return $v >= 0x80000000 ? $v - 0x100000000 : $v; }
    public function u32(): int { $v = unpack('V', $this->bytes(4))[1]; return (int) sprintf('%u', $v); }
    public function f32(): float { return unpack('g', $this->bytes(4))[1]; }
}

function bms_text(string $s): string { return str_replace(["\\", '"'], ['\\\\', '\\"'], $s); }
function bms_line(string $s = ''): string { return $s . "\r\n"; }
function bms_fixed_list(string $blob): array { $parts = preg_split('/\x00+/', $blob) ?: []; return array_values(array_filter($parts, static fn($v) => $v !== '')); }
function bms_items_def_names(string $root): array {
    $path = $root . '/resources/itemsDef.js'; $map = [];
    if (!is_file($path)) return $map;
    $txt = file_get_contents($path); if ($txt === false) return $map;
    if (preg_match_all('/begin\s+"([^"]*)"\s*(.*?)\bend\b/s', $txt, $m, PREG_SET_ORDER)) {
        foreach ($m as $block) if (preg_match('/\bid\s+(\d+)/', $block[2], $id)) $map[(int)$id[1]] = $block[1];
    }
    return $map;
}
function bms_entity(BmsReader $r, string $category, array $names): array {
    $start = $r->p;
    $e = [];
    $e['type_id'] = $r->i32();
    $e['name_index'] = $r->i32();
    $e['id'] = $r->i32();
    $e['attr'] = $r->u32();
    $e['x'] = $r->i32(); $e['y'] = $r->i32(); $e['z'] = $r->i32();
    $e['wpdistance'] = $r->i32();
    $e['waccuracy1'] = $r->i16(); $e['waccuracy2'] = $r->i16();
    $e['perception2'] = $r->i32(); $e['perfectionist2'] = $r->i32();
    $e['min_engagement'] = $r->i32(); $e['max_engagement'] = $r->i32();
    $e['wp_number'] = $r->i32();
    $e['fov'] = $r->i16(); $e['yaw'] = $r->i16();
    $e['crouchtimer'] = $r->i16(); $e['shoottimer'] = $r->i16(); $e['attention'] = $r->i16();
    $e['pitch'] = $r->i16(); $e['roll'] = $r->i16(); $e['spawns'] = $r->i16();
    $e['team'] = $r->u8(); $e['group'] = $r->u8(); $e['waypoint'] = $r->u8(); $e['obliqueness'] = $r->u8();
    $e['map_symbol'] = $r->i8 ?? null;
    // Remaining fields vary slightly between community BMS notes and observed DFBHD files; preserve raw and decode common tail values by offset.
    $r->p = $start;
    $raw = $r->bytes(176);
    $u8 = static fn(int $o): int => ord($raw[$o]);
    $i16 = static function(int $o) use ($raw): int { $v = unpack('v', substr($raw, $o, 2))[1]; return $v >= 0x8000 ? $v - 0x10000 : $v; };
    $u16 = static fn(int $o): int => unpack('v', substr($raw, $o, 2))[1];
    $i32 = static function(int $o) use ($raw): int { $v = unpack('V', substr($raw, $o, 4))[1]; return $v >= 0x80000000 ? $v - 0x100000000 : $v; };
    $fixed = static function(int $o, int $len) use ($raw): string { $s = substr($raw, $o, $len); $z = strpos($s, "\0"); return $z === false ? $s : substr($s, 0, $z); };
    $e['type_id'] = $i32(0); $e['name_index'] = $i32(4); $e['id'] = $i32(8); $e['attr'] = unpack('V', substr($raw, 12, 4))[1];
    $e['x'] = $i32(16); $e['y'] = $i32(20); $e['z'] = $i32(24); $e['wpdistance'] = $i32(28);
    $e['waccuracy1'] = $i16(32); $e['waccuracy2'] = $i16(34); $e['perception2'] = $i32(36); $e['perfectionist2'] = $i32(40);
    $e['min_engagement'] = $i32(44); $e['max_engagement'] = $i32(48); $e['wp_number'] = $i32(52);
    $e['fov'] = $i16(56); $e['yaw'] = $i16(58); $e['crouchtimer'] = $i16(60); $e['shoottimer'] = $i16(62); $e['attention'] = $i16(64);
    $e['pitch'] = $i16(66); $e['roll'] = $i16(68); $e['spawns'] = $i16(70); $e['group'] = $u8(73); $e['obliqueness'] = $u8(75);
    $e['map_symbol'] = $u8(76); if ($e['map_symbol'] >= 128) $e['map_symbol'] -= 256;
    $e['advancetimer'] = $i32(84); $e['name1'] = $fixed(116, 8); $e['name2'] = $fixed(124, 8); $e['gen_string'] = $fixed(132, 36);
    $e['max_attack_distance'] = $i32(168 - 15); // fallback corrected below when sane
    $e['mlink'] = '';
    $e['extra1'] = $e['extra2'] = $e['extra3'] = $e['extra4'] = $e['extra5'] = $e['extramode'] = $e['extrabh'] = 0;
    $e['height_lock'] = 1;
    $e['layer'] = ['item' => 6, 'building' => 4, 'marker' => 8, 'organic' => 3][$category] ?? 0;
    $e['name'] = $names[100000 + $e['type_id']] ?? $names[$e['type_id']] ?? ('Type ' . $e['type_id']);
    if ($e['gen_string'] === '') $e['gen_string'] = 'null';
    return $e;
}

try {
    $root = dirname(__DIR__);
    $names = bms_items_def_names($root);
    $r = new BmsReader($data);
    $h = [];
    $h['magic'] = $r->fixed(4); $h['mission_name'] = $r->fixed(32); $h['designer'] = $r->fixed(32); $h['terrain'] = $r->fixed(48); $h['default'] = $r->fixed(16);
    $h['climate'] = $r->u32(); $h['attrib'] = $r->u32(); $r->bytes(12); $h['water'] = $r->u16(); $r->u32(); $h['fog'] = $r->u16(); $h['fog_color'] = [$r->u8(), $r->u8(), $r->u8()]; $r->u8();
    $h['num_items'] = $r->u32(); $h['num_buildings'] = $r->u32(); $h['num_markers'] = $r->u32(); $h['num_people'] = $r->u32(); $h['num_events_header'] = $r->u32(); $h['weather'] = $r->u32();
    $h['win'] = array_values(unpack('C8', $r->bytes(8))); $h['lose'] = array_values(unpack('C8', $r->bytes(8))); $r->bytes(16); $h['environment'] = $r->fixed(16);
    $r->bytes(10); $h['water_color'] = [$r->u8(), $r->u8(), $r->u8()]; $h['murk'] = $r->u16(); $r->u8(); $h['wind_speed'] = $r->u32(); $h['wind_dir'] = $r->u32(); $r->bytes(4);
    $h['health'] = $r->u32(); $h['mana'] = $r->u32(); $h['music'] = $r->u32(); $h['reverb'] = $r->u32(); $h['tile'] = $r->fixed(16); $h['brief'] = $r->fixed(256);
    $r->i16(); $h['mission_type'] = $r->u8(); $h['max_saves'] = $r->u8(); $r->bytes(16); $h['map_zoom'] = $r->f32(); $h['area_trigger_count'] = $r->i16(); $h['loadout_len'] = $r->u16(); $h['bonus'] = $r->u16(); $r->u16(); $h['start'] = $r->u16(); $h['minutes'] = $r->u16(); $r->bytes(28);
    if ($r->p !== 616) throw new RuntimeException('Unsupported BMS header layout');
    $loadout = bms_fixed_list($r->bytes($h['loadout_len']));
    $entities = [];
    foreach ([['item', $h['num_items']], ['building', $h['num_buildings']], ['marker', $h['num_markers']], ['organic', $h['num_people']]] as [$cat, $count]) {
        for ($i = 0; $i < $count; $i++) $entities[] = bms_entity($r, $cat, $names);
    }
    $waypoints = [];
    for ($i = 0; $i < 128; $i++) {
        $raw = $r->bytes(136); $flags = unpack('V', substr($raw, 0, 4))[1]; $cnt = unpack('V', substr($raw, 4, 4))[1];
        $nums = []; for ($j = 0; $j < min($cnt, 32); $j++) $nums[] = unpack('V', substr($raw, 8 + $j * 4, 4))[1];
        if ($cnt > 0 || $i >= 125) $waypoints[$i] = ['flags' => $flags, 'nums' => $nums];
    }
    $groupsRaw = []; for ($i = 0; $i < 64; $i++) $groupsRaw[$i] = $r->bytes(32);
    $layersRaw = []; for ($i = 0; $i < 32; $i++) $layersRaw[$i] = $r->bytes(20);
    for ($i = 0; $i < $h['area_trigger_count']; $i++) $r->bytes(32);
    $eventsCount = $r->i32(); $triggersCount = $r->i32(); $actionsCount = $r->i32();
    for ($i = 0; $i < $eventsCount; $i++) $r->bytes(24);
    for ($i = 0; $i < $triggersCount; $i++) $r->bytes(32);
    for ($i = 0; $i < $actionsCount; $i++) $r->bytes(32);
    $bboxCount = ($r->p + 4 <= $r->n) ? $r->i32() : 0; for ($i = 0; $i < $bboxCount; $i++) $r->bytes(36);

    $out = '';
    $out .= bms_line('// Created by the Maping native PHP BMS2MIS converter saved on ' . gmdate('m/d/Y H:i'));
    $out .= bms_line('// Native converter: no Wine/cPanel executable dependency');
    $out .= bms_line('// Total Items    : ' . count($entities));
    $out .= bms_line('// Total Groups   : 2');
    $out .= bms_line('// Total Areas    : ' . $h['area_trigger_count']);
    $out .= bms_line('// Total Waypoints: ' . count(array_filter($waypoints, fn($w, $k) => $k < 125 && count($w['nums']) > 0, ARRAY_FILTER_USE_BOTH)));
    $out .= bms_line('// Total Events   : ' . $eventsCount); $out .= bms_line('// Total Triggers : ' . $triggersCount); $out .= bms_line('// Total Actions  : ' . $actionsCount); $out .= bms_line();
    $out .= bms_line('begin general_information');
    $out .= bms_line('  file_version 2');
    $out .= bms_line('  name "' . bms_text($h['mission_name']) . '"');
    $out .= bms_line('  designer "' . bms_text($h['designer']) . '"');
    $out .= bms_line('  terrain ' . $h['terrain']); $out .= bms_line('  cnv_file '); $out .= bms_line('  tt_file '); $out .= bms_line('  terrain_color 0');
    $out .= bms_line('  attrib ' . $h['attrib']); $out .= bms_line('  visible_if 0'); $out .= bms_line('  notvisible_if 0'); $out .= bms_line('  arty 0');
    $out .= bms_line('  water_level ' . $h['water']); $out .= bms_line('  fog_level ' . $h['fog']); $out .= bms_line('  fog_color ' . implode(' ', $h['fog_color']));
    $out .= bms_line('  weather_type ' . $h['weather']); $out .= bms_line('  lowest_elev 0'); $out .= bms_line('  num_items ' . count($entities)); $out .= bms_line('  num_events ' . $eventsCount);
    $out .= bms_line('  sunset ' . $h['environment']); $out .= bms_line('  viewx 0'); $out .= bms_line('  viewy 0'); $out .= bms_line('  viewz 0'); $out .= bms_line('  viewzoom 0.001000');
    $out .= bms_line('  Gen_Def_Val1 0'); $out .= bms_line('  Gen_Def_Val2 0'); $out .= bms_line('  Gen_Def_Val3 0'); $out .= bms_line('  Gen_Def_Val4 0');
    $out .= bms_line('  hardwin 0'); $out .= bms_line('  hardlose 0'); $out .= bms_line('  subgoals_win ' . implode(' ', $h['win']) . ' '); $out .= bms_line('  subgoals_lose ' . implode(' ', $h['lose']) . ' ');
    $out .= bms_line('  win_scores 0 0 0 0 0 0 0 0 '); $out .= bms_line('  lose_scores 0 0 0 0 0 0 0 0 '); $out .= bms_line('  Terrain_tile_tga ' . $h['tile']);
    $out .= bms_line('  wind ' . $h['wind_speed'] . ' ' . $h['wind_dir']); $out .= bms_line('  wp_names_blue 0 0 0 0 0 0 0 0'); $out .= bms_line('  wp_names_red 0 0 0 0 0 0 0 0');
    $out .= bms_line('  Player_Type ' . $h['mission_type']); $out .= bms_line('  Max_Saves ' . $h['max_saves']); $out .= bms_line('  Map_Zoom ' . number_format($h['map_zoom'], 2, '.', '')); $out .= bms_line('  bonus_expiration ' . $h['bonus']);
    $out .= bms_line('  default_primary   ' . ($loadout[0] ?? 'null')); $out .= bms_line('  default_secondary ' . ($loadout[2] ?? ($loadout[1] ?? 'null'))); $out .= bms_line('  default_accessory ' . ($loadout[3] ?? 'null'));
    $out .= bms_line('end general_information'); $out .= bms_line();
    $out .= bms_line('begin weapon_availability'); foreach ($loadout as $w) if ($w !== 'null') $out .= bms_line('  ' . str_pad($w, 20) . 'ALWAYS_ON'); $out .= bms_line('end weapon_availability'); $out .= bms_line();
    foreach ($waypoints as $idx => $w) {
        $out .= bms_line('begin waypoint ' . $idx);
        $desc = $idx === 125 ? 'Goto SSN' : ($idx === 126 ? 'Goto Group' : ($idx === 127 ? 'Goto Player' : 'Waypoint ' . $idx));
        $out .= bms_line('  description "' . $desc . '"'); if ($idx === 126) $out .= bms_line('  color 1'); if ($idx === 127) $out .= bms_line('  color 2');
        foreach ($w['nums'] as $n) $out .= bms_line('  waypoint ' . $n); $out .= bms_line('end waypoint'); $out .= bms_line();
    }
    $out .= bms_line('begin group 1'); $out .= bms_line('  description "Blue Players"'); $out .= bms_line('end group'); $out .= bms_line();
    $out .= bms_line('begin group 2'); $out .= bms_line('  description "Red Players"'); $out .= bms_line('end group'); $out .= bms_line();
    foreach ([2=>'Decorations',4=>'Buildings',6=>'Objects',8=>'Markers'] as $lid=>$desc) { $out .= bms_line('begin layer ' . $lid); $out .= bms_line('  Description "' . $desc . '"'); $out .= bms_line('  Color "' . (10+$lid) . '"'); $out .= bms_line('end layer'); $out .= bms_line(); }
    foreach ($entities as $i => $e) {
        $out .= bms_line('begin item ' . $i);
        $out .= bms_line('  type_id ' . $e['type_id']); $out .= bms_line('  name "' . bms_text($e['name']) . '"'); $out .= bms_line('  iai_name "' . bms_text($e['name1']) . '"'); $out .= bms_line('  ai_textfile "' . bms_text($e['name2']) . '"'); $out .= bms_line('  id ' . $e['id']);
        $out .= bms_line('  position ' . $e['x'] . ' ' . $e['y'] . ' ' . $e['z']); if ($e['yaw'] || $e['pitch']) $out .= bms_line('  facing ' . $e['yaw'] . ' ' . $e['pitch']);
        $out .= bms_line('  map_symbol ' . $e['map_symbol']); if ($e['attr']) $out .= bms_line('  bmsi_attributes ' . $e['attr']); $out .= bms_line('  wpdistance ' . $e['wpdistance']); $out .= bms_line('  fov ' . $e['fov']);
        $out .= bms_line('  layer ' . $e['layer']); if ($e['group']) $out .= bms_line('  group ' . $e['group']); if ($e['wp_number']) $out .= bms_line('  waypoint ' . $e['wp_number']);
        $out .= bms_line('  obliqueness ' . $e['obliqueness']); $out .= bms_line('  waccuracy1 ' . $e['waccuracy1']); $out .= bms_line('  waccuracy2 ' . $e['waccuracy2']);
        $out .= bms_line('  perception2 ' . $e['perception2']); $out .= bms_line('  perfectionist2 ' . $e['perfectionist2']); $out .= bms_line('  crouchtimer ' . $e['crouchtimer']); $out .= bms_line('  shoottimer ' . $e['shoottimer']);
        $out .= bms_line('  attention ' . $e['attention']); $out .= bms_line('  advancetimer ' . $e['advancetimer']); $out .= bms_line('  max_attack_distance 16'); $out .= bms_line('  edistances ' . $e['min_engagement'] . ' ' . $e['max_engagement']);
        $out .= bms_line('  extra_mlink ""'); for ($x=1;$x<=5;$x++) $out .= bms_line('  extra_val' . $x . ' 0'); $out .= bms_line('  extra_valmode 0'); $out .= bms_line('  extra_bheight 0');
        $out .= bms_line('  gen_string "' . bms_text($e['gen_string']) . '"'); $out .= bms_line('  height_lock 1'); $out .= bms_line('end item'); $out .= bms_line();
    }
    if (!is_dir(dirname($output)) && !mkdir(dirname($output), 0755, true) && !is_dir(dirname($output))) throw new RuntimeException('Could not create output directory');
    if (file_put_contents($output, $out) === false) throw new RuntimeException('Could not write MIS output');
    fwrite(STDOUT, "Native PHP converted {$input} -> {$output}\n");
} catch (Throwable $e) { fwrite(STDERR, $e->getMessage() . "\n"); exit(1); }
