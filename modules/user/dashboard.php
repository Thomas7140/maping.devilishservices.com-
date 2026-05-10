<?php
declare(strict_types=1);

session_start();

header('X-Content-Type-Options: nosniff');

$root = dirname(__DIR__, 2);
$db = null;

foreach ([
    $root . '/includes/db.php',
    $root . '/config/db.php',
    $root . '/db.php',
    $root . '/includes/database.php',
] as $dbFile) {
    if (is_file($dbFile)) {
        require_once $dbFile;
        break;
    }
}

if (isset($pdo) && $pdo instanceof PDO) {
    $db = $pdo;
} elseif (isset($conn) && $conn instanceof PDO) {
    $db = $conn;
} elseif (isset($GLOBALS['pdo']) && $GLOBALS['pdo'] instanceof PDO) {
    $db = $GLOBALS['pdo'];
}

function h(mixed $v): string {
    return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function current_username(): string {
    foreach (['username','user_name','name','email'] as $key) {
        if (!empty($_SESSION[$key])) {
            return preg_replace('/[^A-Za-z0-9._@-]+/', '_', (string)$_SESSION[$key]);
        }
    }
    if (!empty($_SESSION['user']) && is_array($_SESSION['user'])) {
        foreach (['username','name','email','id'] as $key) {
            if (!empty($_SESSION['user'][$key])) {
                return preg_replace('/[^A-Za-z0-9._@-]+/', '_', (string)$_SESSION['user'][$key]);
            }
        }
    }
    if (!empty($_SESSION['user_id'])) {
        return 'user_' . preg_replace('/[^A-Za-z0-9._-]+/', '_', (string)$_SESSION['user_id']);
    }
    return 'guest';
}

function current_user_id() {
    if (!empty($_SESSION['user_id'])) return $_SESSION['user_id'];
    if (!empty($_SESSION['id'])) return $_SESSION['id'];
    if (!empty($_SESSION['user']['id'])) return $_SESSION['user']['id'];
    return null;
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

$username = current_username();
$userId = current_user_id();
$displayName = $username;
$completedFolderName = $username;

$dbRows = [];
$completedRows = [];

// DB rows first.
if ($db instanceof PDO) {
    try {
        if ($userId !== null) {
            $userStmt = $db->prepare('SELECT display_name, email FROM users WHERE id = :id LIMIT 1');
            $userStmt->execute([':id' => $userId]);
            $userRow = $userStmt->fetch(PDO::FETCH_ASSOC);
            if (is_array($userRow)) {
                $displayName = trim((string)($userRow['display_name'] ?? ''));
                if ($displayName === '') {
                    $displayName = trim((string)($userRow['email'] ?? $username));
                }
                $completedFolderName = safe_path_segment($displayName, (string)$userId);
            }
        }

        $where = [];
        $params = [];
        if ($userId !== null) {
            $where[] = 'user_id = :uid';
            $params[':uid'] = $userId;
        }
        // Also match username columns when present; ignore if columns do not exist.
        $sql = 'SELECT * FROM user_map_uploads';
        if ($where) $sql .= ' WHERE ' . implode(' OR ', $where);
        $sql .= ' ORDER BY COALESCE(uploaded_at, created_at, updated_at) DESC, id DESC LIMIT 500';
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $r) {
            $filename = $r['stored_filename'] ?? $r['filename'] ?? $r['map_filename'] ?? $r['original_filename'] ?? '';
            $dbRows[] = [
                'id' => $r['id'] ?? '',
                'original_filename' => $r['original_filename'] ?? '',
                'stored_filename' => $filename,
                'original_extension' => $r['original_extension'] ?? strtolower(pathinfo((string)$r['original_filename'], PATHINFO_EXTENSION)),
                'stored_path' => $r['stored_path'] ?? '',
                'conversion_status' => $r['conversion_status'] ?? '',
                'file_size' => $r['file_size'] ?? $r['size'] ?? '',
                'uploaded_at' => $r['uploaded_at'] ?? $r['created_at'] ?? $r['updated_at'] ?? '',
                'status' => $r['status'] ?? 'listed',
            ];
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
    return strcmp((string)($b['uploaded_at'] ?? ''), (string)($a['uploaded_at'] ?? ''));
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
                            <th>Uploaded / Updated</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($dbRows as $r): ?>
                        <tr>
                            <td><?= h($r['id']) ?></td>
                            <td><?= h($r['original_filename']) ?></td>
                            <td><?= h($r['stored_filename']) ?></td>
                            <td><?= h($r['stored_path']) ?></td>
                            <td><span class="pill"><?= h(strtoupper((string)$r['original_extension'])) ?></span></td>
                            <td><?= h($r['conversion_status']) ?></td>
                            <td><?= h(fmt_size($r['file_size'])) ?></td>
                            <td><?= h($r['uploaded_at']) ?></td>
                            <td><?= h($r['status']) ?></td>
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
