<?php
declare(strict_types=1);

function maping_ensure_bms_exports_table(): void
{
    try {
        maping_pdo()->exec(
            "CREATE TABLE IF NOT EXISTS user_bms_exports (
                id                    char(36)         CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
                user_id               char(36)         CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
                display_name_snapshot varchar(120)     NOT NULL,
                source_mis_filename   varchar(255)     NOT NULL,
                stored_filename       varchar(255)     NOT NULL,
                stored_relative_path  varchar(255)     NOT NULL,
                stored_size_bytes     bigint(20) UNSIGNED NOT NULL DEFAULT 0,
                sha256_hash           char(64)         NOT NULL,
                created_at            datetime         NOT NULL,
                PRIMARY KEY (id),
                KEY idx_user_bms_exports_user_id (user_id),
                KEY idx_user_bms_exports_created_at (created_at),
                KEY idx_user_bms_exports_user_hash (user_id, sha256_hash),
                CONSTRAINT fk_user_bms_exports_user_id FOREIGN KEY (user_id)
                    REFERENCES users (id)
                    ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
    } catch (Throwable $exception) {
        @file_put_contents(
            maping_project_root() . DIRECTORY_SEPARATOR . 'maping-error.log',
            '[' . gmdate('c') . '] ensure user_bms_exports failed: ' . $exception->getMessage() . PHP_EOL,
            FILE_APPEND
        );
    }
}

function maping_record_bms_export(
    string $userId,
    string $displayNameSnapshot,
    string $sourceMisFilename,
    string $storedFilename,
    string $storedRelativePath,
    string $storedAbsolutePath,
    int    $storedSizeBytes
): void {
    maping_ensure_bms_exports_table();
    $stmt = maping_pdo()->prepare(
        'INSERT INTO user_bms_exports (
            id, user_id, display_name_snapshot, source_mis_filename,
            stored_filename, stored_relative_path, stored_size_bytes, sha256_hash, created_at
         ) VALUES (
            :id, :user_id, :display_name_snapshot, :source_mis_filename,
            :stored_filename, :stored_relative_path, :stored_size_bytes, :sha256_hash, :created_at
         )'
    );
    $stmt->execute([
        'id'                    => maping_generate_uid(),
        'user_id'               => $userId,
        'display_name_snapshot' => $displayNameSnapshot,
        'source_mis_filename'   => $sourceMisFilename,
        'stored_filename'       => $storedFilename,
        'stored_relative_path'  => $storedRelativePath,
        'stored_size_bytes'     => $storedSizeBytes,
        'sha256_hash'           => hash_file('sha256', $storedAbsolutePath),
        'created_at'            => maping_now(),
    ]);
}
