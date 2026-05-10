<?php
declare(strict_types=1);

function maping_ensure_user_map_uploads_table(): void
{
    try {
        maping_pdo()->exec(
            "CREATE TABLE IF NOT EXISTS user_map_uploads (
                id char(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
                user_id char(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
                display_name_snapshot varchar(120) NOT NULL,
                original_filename varchar(255) NOT NULL,
                original_extension varchar(10) NOT NULL,
                stored_filename varchar(255) NOT NULL,
                stored_relative_path varchar(255) NOT NULL,
                stored_size_bytes bigint(20) UNSIGNED NOT NULL DEFAULT 0,
                sha256_hash char(64) NOT NULL,
                converted_from_extension varchar(10) DEFAULT NULL,
                conversion_status varchar(20) NOT NULL DEFAULT 'uploaded',
                created_at datetime NOT NULL,
                PRIMARY KEY (id),
                KEY idx_user_map_uploads_user_id (user_id),
                KEY idx_user_map_uploads_created_at (created_at),
                KEY idx_user_map_uploads_conversion_status (conversion_status),
                UNIQUE KEY uq_user_map_uploads_user_path (user_id, stored_relative_path),
                KEY idx_user_map_uploads_user_hash (user_id, sha256_hash)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
        // Older installs may have the table without the unique path index. Add it if possible
        // after cleanup; ignore errors so broken legacy duplicates do not break uploads.
        try { maping_pdo()->exec("ALTER TABLE user_map_uploads ADD UNIQUE KEY uq_user_map_uploads_user_path (user_id, stored_relative_path)"); } catch (Throwable $ignored) {}
        try { maping_pdo()->exec("ALTER TABLE user_map_uploads ADD KEY idx_user_map_uploads_user_hash (user_id, sha256_hash)"); } catch (Throwable $ignored) {}
    } catch (Throwable $exception) {
        @file_put_contents(
            maping_project_root() . DIRECTORY_SEPARATOR . 'maping-error.log',
            '[' . gmdate('c') . '] ensure user_map_uploads failed: ' . $exception->getMessage() . PHP_EOL,
            FILE_APPEND
        );
    }
}


function maping_canonical_map_filename(string $filename): string
{
    $filename = basename(str_replace('\\', '/', $filename));
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $base = pathinfo($filename, PATHINFO_FILENAME);
    $base = preg_replace('/_\d{8}_\d{6}_[a-f0-9]{8}$/i', '', $base) ?: $base;
    return $base . ($ext !== '' ? '.' . strtolower($ext) : '');
}

function maping_record_user_upload(array $user, array $uploadInfo, array $data): ?string
{
    maping_ensure_user_map_uploads_table();

    try {
        $insert = maping_pdo()->prepare(
            'INSERT INTO user_map_uploads (
                id, user_id, display_name_snapshot, original_filename, original_extension,
                stored_filename, stored_relative_path, stored_size_bytes, sha256_hash,
                converted_from_extension, conversion_status, created_at
             ) VALUES (
                :id, :user_id, :display_name_snapshot, :original_filename, :original_extension,
                :stored_filename, :stored_relative_path, :stored_size_bytes, :sha256_hash,
                :converted_from_extension, :conversion_status, :created_at
             ) ON DUPLICATE KEY UPDATE
                original_filename = VALUES(original_filename),
                original_extension = VALUES(original_extension),
                stored_filename = VALUES(stored_filename),
                stored_size_bytes = VALUES(stored_size_bytes),
                sha256_hash = VALUES(sha256_hash),
                converted_from_extension = VALUES(converted_from_extension),
                conversion_status = VALUES(conversion_status),
                created_at = VALUES(created_at)'
        );
        $originalExtension = strtolower((string) ($data['original_extension'] ?? strtolower(pathinfo((string) ($data['stored_filename'] ?? ''), PATHINFO_EXTENSION))));
        $originalFilename = (string) ($data['original_filename'] ?? $data['stored_filename'] ?? 'map.mis');

        // Raw .bms originals are kept in uploads/<user>/ only. They must not be represented
        // as .bms records in user_map_uploads; the DB tracks the converted/loadable .mis file.
        if ($originalExtension === 'bms') {
            $originalExtension = 'mis';
            $storedFilenameForName = (string) ($data['stored_filename'] ?? 'map.mis');
            $originalFilename = preg_replace('/\.bms$/i', '.mis', $storedFilenameForName) ?: $storedFilenameForName;
        }

        $storedRelativePath = str_replace('\\', '/', (string) ($data['stored_relative_path'] ?? ''));
        $storedFilename = (string) ($data['stored_filename'] ?? basename($storedRelativePath ?: 'map.mis'));
        $hash = (string) ($data['sha256_hash'] ?? '');
        $canonical = maping_canonical_map_filename($storedFilename);

        // Prevent repeated rows for the same loadable map. This handles older databases that
        // were missing the unique index, and removes the timestamp/hash duplicate filenames.
        $cleanup = maping_pdo()->prepare(
            "DELETE FROM user_map_uploads
             WHERE user_id = :user_id
               AND (
                    stored_relative_path = :stored_relative_path
                    OR (:sha256_hash <> '' AND sha256_hash = :sha256_hash)
                    OR LOWER(stored_filename) = LOWER(:stored_filename)
                    OR LOWER(stored_filename) REGEXP :timestamp_variant_regex
               )"
        );
        $baseForRegex = preg_quote(pathinfo($canonical, PATHINFO_FILENAME), '/');
        $extForRegex = preg_quote(pathinfo($canonical, PATHINFO_EXTENSION) ?: 'mis', '/');
        $cleanup->execute([
            'user_id' => (string) $user['id'],
            'stored_relative_path' => $storedRelativePath,
            'sha256_hash' => $hash,
            'stored_filename' => $storedFilename,
            'timestamp_variant_regex' => '^' . $baseForRegex . '(_[0-9]{8}_[0-9]{6}_[a-f0-9]{8})?\.' . $extForRegex . '$',
        ]);

        $insert->execute([
            'id' => (string) ($data['id'] ?? maping_generate_uid()),
            'user_id' => (string) $user['id'],
            'display_name_snapshot' => (string) ($uploadInfo['display_name'] ?? ($user['display_name'] ?? 'User')),
            'original_filename' => $originalFilename,
            'original_extension' => $originalExtension,
            'stored_filename' => $storedFilename,
            'stored_relative_path' => $storedRelativePath,
            'stored_size_bytes' => (int) ($data['stored_size_bytes'] ?? 0),
            'sha256_hash' => $hash,
            'converted_from_extension' => $data['converted_from_extension'] ?? null,
            'conversion_status' => (string) ($data['conversion_status'] ?? 'uploaded'),
            'created_at' => (string) ($data['created_at'] ?? maping_now()),
        ]);
        return null;
    } catch (Throwable $exception) {
        $message = 'Upload saved, but database history was not recorded: ' . $exception->getMessage();
        @file_put_contents(
            maping_project_root() . DIRECTORY_SEPARATOR . 'maping-error.log',
            '[' . gmdate('c') . '] user_map_uploads insert failed: ' . $exception->getMessage() . PHP_EOL,
            FILE_APPEND
        );
        return $message;
    }
}

function maping_backfill_user_uploads_from_folder(array $user, array $uploadInfo): int
{
    $absoluteDir = (string) ($uploadInfo['absolute_path'] ?? '');
    $relativeDir = (string) ($uploadInfo['relative_path'] ?? 'converted-maps');
    if ($absoluteDir === '' || !is_dir($absoluteDir)) {
        return 0;
    }

    $count = 0;
    $files = glob($absoluteDir . DIRECTORY_SEPARATOR . '*.{mis,txt,MIS,TXT}', GLOB_BRACE) ?: [];
    foreach ($files as $filePath) {
        if (!is_file($filePath)) {
            continue;
        }
        $name = basename($filePath);
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $relativePath = $relativeDir . '/' . $name;
        $warning = maping_record_user_upload($user, $uploadInfo, [
            'id' => substr(hash('sha256', (string) $user['id'] . '|' . $relativePath), 0, 8) . '-' . substr(hash('sha256', $relativePath), 8, 4) . '-' . substr(hash('sha256', $relativePath), 12, 4) . '-' . substr(hash('sha256', $relativePath), 16, 4) . '-' . substr(hash('sha256', $relativePath), 20, 12),
            'original_filename' => $name,
            'original_extension' => $ext,
            'stored_filename' => $name,
            'stored_relative_path' => $relativePath,
            'stored_size_bytes' => (int) (filesize($filePath) ?: 0),
            'sha256_hash' => hash_file('sha256', $filePath) ?: '',
            'converted_from_extension' => null,
            'conversion_status' => 'uploaded',
            'created_at' => gmdate('Y-m-d H:i:s', filemtime($filePath) ?: time()),
        ]);
        if ($warning === null) {
            $count++;
        }
    }
    return $count;
}
