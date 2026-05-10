<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/auth/bootstrap.php';

header('X-Content-Type-Options: nosniff');

$root = dirname(__DIR__, 2);
$db = maping_pdo();

function h(mixed $v): string {
    return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function safe_path_segment(string $value, string $fallback = 'user'): string {
    $value = trim($value);
    if ($value === '') return $fallback;
    $value = str_replace(["/", "\\"], '_', $value);
    $value = preg_replace('/[\x00-\x1F\x7F]+/', '_', $value) ?? $value;
    $value = preg_replace('/[<>:"|?*]+/', '_', $value) ?? $value;
    $value = preg_replace('/\s+/u', ' ', (string)$value) ?? preg_replace('/\s+/', ' ', (string)$value);
    $value = trim((string)$value, " .\t\n\r\0\x0B");
    if (preg_match('/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i', $value)) {
        $value = '_' . $value;
    }
    return $value === '' ? $fallback : $value;
}

$authUser = maping_current_user();
$userId = $authUser['id'] ?? null;
$displayName = 'guest';
$completedFolderName = 'guest';

if (is_array($authUser)) {
    $folderInfo = maping_user_folder_name($authUser);
    $displayName = (string) ($folderInfo['display_name'] ?? 'guest');
    $completedFolderName = (string) ($folderInfo['folder_name'] ?? 'guest');
}

$dbRows = [];
$bmsRows = [];
$completedRows = [];

// DB rows first.
if ($db instanceof PDO) {
    try {
        if ($userId !== null) {
            $stmt = $db->prepare(
                'SELECT id, original_filename, original_extension, stored_filename,
                        stored_relative_path, conversion_status, stored_size_bytes, created_at
                 FROM user_map_uploads
                 WHERE user_id = :uid
                 ORDER BY created_at DESC, id DESC
                 LIMIT 500'
            );
            $stmt->execute([':uid' => $userId]);
            foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $r) {
                $filename = $r['stored_filename'] ?? $r['original_filename'] ?? '';
                $dbRows[] = [
                    'id' => $r['id'] ?? '',
                    'original_filename' => $r['original_filename'] ?? '',
                    'stored_filename' => $filename,
                    'original_extension' => $r['original_extension'] ?? strtolower(pathinfo((string) ($r['original_filename'] ?? ''), PATHINFO_EXTENSION)),
                    'stored_relative_path' => $r['stored_relative_path'] ?? '',
                    'conversion_status' => $r['conversion_status'] ?? '',
                    'stored_size_bytes' => $r['stored_size_bytes'] ?? '',
                    'created_at' => $r['created_at'] ?? '',
                ];
            }
        }
        // user_bms_exports
        try {
            if ($userId !== null) {
                $bstmt = $db->prepare(
                    'SELECT id, source_mis_filename, stored_filename, stored_relative_path,
                            stored_size_bytes, sha256_hash, created_at
                     FROM user_bms_exports
                     WHERE user_id = :uid
                     ORDER BY created_at DESC, id DESC
                     LIMIT 500'
                );
                $bstmt->execute([':uid' => $userId]);
                foreach ($bstmt->fetchAll(PDO::FETCH_ASSOC) as $r) {
                    $bmsRows[] = $r;
                }
            }
        } catch (Throwable $e) {
            $bmsError = $e->getMessage();
        }
    } catch (Throwable $e) {
        // Do not break dashboard if schema differs.
        $dbError = $e->getMessage();
    }
}

$completedDir = $root . '/completed-maps/' . $completedFolderName;

if (is_dir($completedDir)) {
    foreach (glob($completedDir . '/*.{mis,bms,til}', GLOB_BRACE) ?: [] as $file) {
        $filename = basename($file);
        $completedRows[] = [
            'filename' => $filename,
            'extension' => strtolower(pathinfo($filename, PATHINFO_EXTENSION)),
            'size' => filesize($file),
            'modified' => date('Y-m-d H:i:s', filemtime($file)),
            'path' => 'completed-maps/' . $completedFolderName . '/' . $filename,
        ];
    }
}

usort($dbRows, function($a, $b) {
    return strcmp((string)($b['created_at'] ?? ''), (string)($a['created_at'] ?? ''));
});

usort($completedRows, function($a, $b) {
    return strcmp((string)($b['modified'] ?? ''), (string)($a['modified'] ?? ''));
});

function fmt_size(mixed $size): string {
    if ($size === '' || $size === null) return '';
    $size = (float)$size;
    foreach (['B','KB','MB','GB'] as $unit) {
        if ($size < 1024 || $unit === 'GB') return round($size, $unit === 'B' ? 0 : 2) . ' ' . $unit;
        $size /= 1024;
    }
    return '';
}
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>User Dashboard - Map Files</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/svg+xml" href="../../assets/favicon.svg">
<style>
    :root{color-scheme:dark;background:#10141c;color:#eef3ff;font-family:Arial,Helvetica,sans-serif}
    body{margin:0;background:linear-gradient(180deg,#10141c,#0a0d13);color:#eef3ff}
    .wrap{max-width:1200px;margin:0 auto;padding:24px}
    .top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}
    h1{font-size:24px;margin:0}
    .sub{color:#9fb0ca;margin-top:6px}
    .btn{display:inline-block;padding:9px 12px;border:1px solid #31405b;border-radius:10px;background:#172033;color:#dbe8ff;text-decoration:none}
    .stack{display:grid;gap:18px}
    .card{background:#121a29;border:1px solid #2a3853;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.25);overflow:hidden}
    .cardHead{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-bottom:1px solid #24324b;background:#182238}
    .cardTitle{font-size:16px;font-weight:700;color:#e8f0ff}
    .cardMeta{font-size:12px;color:#9fb0ca}
    table{width:100%;border-collapse:collapse}
    th,td{padding:11px 12px;border-bottom:1px solid #24324b;text-align:left;font-size:14px}
    th{background:#182238;color:#cbd8ef;position:sticky;top:0}
    tr:hover td{background:#172033}
    .pill{display:inline-block;border-radius:999px;padding:3px 8px;background:#22304a;color:#cfe0ff;font-size:12px}
    .empty{padding:24px;color:#aebbd0}
    .warn{background:#332316;border:1px solid #6c4a1d;color:#ffd9a6;padding:10px 12px;border-radius:10px;margin-bottom:12px}
    .tools{display:flex;gap:8px;align-items:center}
    input[type=search]{background:#0c111b;border:1px solid #31405b;color:#eef3ff;border-radius:10px;padding:9px 10px;min-width:240px}
</style>
</head>
<body>
<div class="wrap">
    <div class="top">
        <div>
            <h1>User Dashboard</h1>
            <div class="sub">Map files for <strong><?= h($displayName) ?></strong></div>
        </div>
        <div class="tools">
            <input id="q" type="search" placeholder="Search files...">
            <a class="btn" href="../../">Back to editor</a>
        </div>
    </div>

    <?php if (!empty($dbError)): ?>
        <div class="warn">Database rows could not be fully read: <?= h($dbError) ?>. Folder files are still shown.</div>
    <?php endif; ?>

    <div class="stack">
        <div class="card">
            <div class="cardHead">
                <div class="cardTitle">Database Table: user_map_uploads</div>
                <div class="cardMeta"><?= h((string)count($dbRows)) ?> rows</div>
            </div>
            <?php if (!$dbRows): ?>
                <div class="empty">No database rows found for this user.</div>
            <?php else: ?>
                <table class="filterTable" id="dbUploadsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Original File</th>
                            <th>Stored File</th>
                            <th>Stored Path</th>
                            <th>Original Ext</th>
                            <th>Conversion</th>
                            <th>Size</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($dbRows as $r): ?>
                        <tr>
                            <td><?= h($r['id']) ?></td>
                            <td><?= h($r['original_filename']) ?></td>
                            <td><?= h($r['stored_filename']) ?></td>
                            <td><?= h($r['stored_relative_path']) ?></td>
                            <td><span class="pill"><?= h(strtoupper((string)$r['original_extension'])) ?></span></td>
                            <td><?= h($r['conversion_status']) ?></td>
                            <td><?= h(fmt_size($r['stored_size_bytes'])) ?></td>
                            <td><?= h($r['created_at']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <div class="card">
            <div class="cardHead">
                <div class="cardTitle">Database Table: user_bms_exports</div>
                <div class="cardMeta"><?= h((string)count($bmsRows)) ?> rows</div>
            </div>
            <?php if (!empty($bmsError)): ?>
                <div class="warn">Could not read user_bms_exports: <?= h($bmsError) ?></div>
            <?php endif; ?>
            <?php if (!$bmsRows): ?>
                <div class="empty">No BMS export records found for this user.</div>
            <?php else: ?>
                <table class="filterTable" id="bmsExportsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Source MIS</th>
                            <th>Stored BMS File</th>
                            <th>Stored Path</th>
                            <th>Size</th>
                            <th>SHA256</th>
                            <th>Exported At</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($bmsRows as $r): ?>
                        <tr>
                            <td><?= h($r['id'] ?? '') ?></td>
                            <td><?= h($r['source_mis_filename'] ?? '') ?></td>
                            <td><?= h($r['stored_filename'] ?? '') ?></td>
                            <td><?= h($r['stored_relative_path'] ?? '') ?></td>
                            <td><?= h(fmt_size($r['stored_size_bytes'] ?? '')) ?></td>
                            <td style="font-size:11px;color:#7899bb;word-break:break-all"><?= h(substr((string)($r['sha256_hash'] ?? ''), 0, 16)) ?><?= !empty($r['sha256_hash']) ? '…' : '' ?></td>
                            <td><?= h($r['created_at'] ?? '') ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <div class="card">
            <div class="cardHead">
                <div class="cardTitle">Completed Files: completed-maps/<?= h($completedFolderName) ?>/</div>
                <div class="cardMeta"><?= h((string)count($completedRows)) ?> files</div>
            </div>
            <?php if (!$completedRows): ?>
                <div class="empty">No completed map files found for this user.</div>
            <?php else: ?>
                <table class="filterTable" id="completedMapsTable">
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Ext</th>
                            <th>Path</th>
                            <th>Size</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($completedRows as $r): ?>
                        <tr>
                            <td><?= h($r['filename']) ?></td>
                            <td><span class="pill"><?= h(strtoupper((string)$r['extension'])) ?></span></td>
                            <td><?= h($r['path']) ?></td>
                            <td><?= h(fmt_size($r['size'])) ?></td>
                            <td><?= h($r['modified']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</div>
<script>
(function(){
  const q = document.getElementById('q');
  const tables = Array.from(document.querySelectorAll('.filterTable'));
  if (!q || !tables.length) return;
  q.addEventListener('input', () => {
    const term = q.value.toLowerCase();
    tables.forEach(table => {
      table.querySelectorAll('tbody tr').forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  });
})();
</script>
</body>
</html>
