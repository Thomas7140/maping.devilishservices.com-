<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/auth/bootstrap.php';
require_once __DIR__ . '/upload_history.php';

maping_require_method('GET');

try {
    $user = maping_require_auth();
    $uploadInfo = maping_user_upload_dir($user);
    $rawUploadInfo = maping_user_raw_upload_dir($user);
    $absoluteDir = $uploadInfo['absolute_path'];
    $relativeDir = $uploadInfo['relative_path'];
    $uploads = [];
    $backfilled = 0;

    // First, sync loadable .mis/.txt files already sitting in both supported user folders.
    // - converted-maps/<display name>/ for converted BMS output and older uploads
    // - uploads/<display name>/ for normal MIS uploads
    $backfilled = maping_backfill_user_uploads_from_folder($user, $uploadInfo);
    $backfilled += maping_backfill_user_uploads_from_folder($user, $rawUploadInfo);

    // Then read from database history.
    try {
        maping_ensure_user_map_uploads_table();
        // Remove/ignore any legacy rows that represented raw .bms uploads.
        // user_map_uploads must only contain loadable .mis/.txt files, never raw .bms files.
        try {
            maping_pdo()->prepare(
                "DELETE FROM user_map_uploads
                 WHERE user_id = :user_id
                   AND (LOWER(original_extension) = 'bms'
                        OR LOWER(original_filename) LIKE '%.bms'
                        OR LOWER(stored_filename) LIKE '%.bms'
                        OR LOWER(stored_relative_path) LIKE '%.bms')"
            )->execute(['user_id' => $user['id']]);
        } catch (Throwable $cleanupException) {
            @file_put_contents(
                maping_project_root() . DIRECTORY_SEPARATOR . 'maping-error.log',
                '[' . gmdate('c') . '] legacy bms upload cleanup failed: ' . $cleanupException->getMessage() . PHP_EOL,
                FILE_APPEND
            );
        }
        $query = maping_pdo()->prepare(
            'SELECT id, original_filename, original_extension, stored_filename, stored_relative_path, stored_size_bytes,
                    sha256_hash, conversion_status, converted_from_extension, created_at
             FROM user_map_uploads
             WHERE user_id = :user_id
             ORDER BY created_at DESC
             LIMIT 250'
        );
        $query->execute(['user_id' => $user['id']]);
        foreach ($query->fetchAll() ?: [] as $row) {
            $path = str_replace('\\', '/', (string) ($row['stored_relative_path'] ?? ''));
            if ($path === '' || str_contains($path, '..')) {
                continue;
            }
            $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
            $originalExtension = strtolower((string) ($row['original_extension'] ?? ''));
            $storedFilename = (string) ($row['stored_filename'] ?? basename($path));
            $originalFilename = (string) ($row['original_filename'] ?? '');
            if (!in_array($extension, ['mis', 'txt'], true)) {
                continue;
            }
            if ($originalExtension === 'bms' || preg_match('/\.bms$/i', $storedFilename) || preg_match('/\.bms$/i', $originalFilename)) {
                continue;
            }
            $uploads[] = [
                'id' => (string) ($row['id'] ?? ''),
                'original_filename' => (string) ($row['original_filename'] ?? ''),
                'stored_filename' => (string) ($row['stored_filename'] ?? basename($path)),
                'stored_path' => $path,
                'stored_size_bytes' => (int) ($row['stored_size_bytes'] ?? 0),
                'sha256_hash' => (string) ($row['sha256_hash'] ?? ''),
                'original_extension' => $originalExtension,
                'conversion_status' => (string) ($row['conversion_status'] ?? 'uploaded'),
                'converted_from_extension' => $row['converted_from_extension'] ?? null,
                'created_at' => (string) ($row['created_at'] ?? ''),
            ];
        }
    } catch (Throwable $historyException) {
        @file_put_contents(
            maping_project_root() . DIRECTORY_SEPARATOR . 'maping-error.log',
            '[' . gmdate('c') . '] list uploads db failed: ' . $historyException->getMessage() . PHP_EOL,
            FILE_APPEND
        );
    }

    // Last-resort dropdown fallback even if database access fails.
    if (!$uploads) {
        $fallbackDirs = [$uploadInfo, $rawUploadInfo];
        $files = [];
        foreach ($fallbackDirs as $dirInfo) {
            $dir = (string) ($dirInfo['absolute_path'] ?? '');
            if (!is_dir($dir)) {
                continue;
            }
            foreach (glob($dir . DIRECTORY_SEPARATOR . '*.{mis,txt,MIS,TXT}', GLOB_BRACE) ?: [] as $filePath) {
                $files[] = [$filePath, (string) ($dirInfo['relative_path'] ?? '')];
            }
        }
        usort($files, static fn(array $a, array $b): int => (filemtime($b[0]) ?: 0) <=> (filemtime($a[0]) ?: 0));
        foreach (array_slice($files, 0, 250) as [$filePath, $dirRelativePath]) {
            if (!is_file($filePath)) {
                continue;
            }
            $name = basename($filePath);
            $uploads[] = [
                'id' => hash('sha256', $filePath),
                'original_filename' => $name,
                'stored_filename' => $name,
                'stored_path' => $dirRelativePath . '/' . $name,
                'stored_size_bytes' => (int) (filesize($filePath) ?: 0),
                'sha256_hash' => '',
                'conversion_status' => 'uploaded',
                'converted_from_extension' => null,
                'created_at' => gmdate('Y-m-d H:i:s', filemtime($filePath) ?: time()),
            ];
        }
    }

    maping_json_response([
        'success' => true,
        'backfilled' => $backfilled,
        'uploads' => $uploads,
    ]);
} catch (Throwable $exception) {
    @file_put_contents(
        maping_project_root() . DIRECTORY_SEPARATOR . 'maping-error.log',
        '[' . gmdate('c') . '] list uploads fatal: ' . $exception->getMessage() . PHP_EOL,
        FILE_APPEND
    );
    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
