CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    email VARCHAR(191) NOT NULL,
    display_name VARCHAR(120) NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    last_login_at DATETIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_resets (
    id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    user_id CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    requested_ip VARCHAR(45) NULL,
    requested_user_agent VARCHAR(255) NULL,
    PRIMARY KEY (id),
    KEY idx_password_resets_user_id (user_id),
    KEY idx_password_resets_expires_at (expires_at),
    CONSTRAINT fk_password_resets_user_id FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_map_uploads (
    id                       CHAR(36)         CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    user_id                  CHAR(36)         CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    display_name_snapshot    VARCHAR(120)     NOT NULL,
    original_filename        VARCHAR(255)     NOT NULL,
    original_extension       VARCHAR(10)      NOT NULL,
    stored_filename          VARCHAR(255)     NOT NULL,
    stored_relative_path     VARCHAR(255)     NOT NULL,
    stored_size_bytes        BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
    sha256_hash              CHAR(64)         NOT NULL,
    converted_from_extension VARCHAR(10)      DEFAULT NULL,
    conversion_status        VARCHAR(20)      NOT NULL DEFAULT 'uploaded',
    created_at               DATETIME         NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_user_map_uploads_user_path (user_id, stored_relative_path),
    KEY idx_user_map_uploads_user_id (user_id),
    KEY idx_user_map_uploads_created_at (created_at),
    KEY idx_user_map_uploads_conversion_status (conversion_status),
    KEY idx_user_map_uploads_user_hash (user_id, sha256_hash),
    CONSTRAINT fk_user_map_uploads_user_id FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- conversion_status values: 'uploaded' | 'converted' | 'saved'
-- 'saved'      = completed map saved from the editor  -> stored_relative_path LIKE 'completed-maps/%'
-- 'converted'  = BMS->MIS conversion result           -> stored_relative_path LIKE 'converted-maps/%'
-- 'uploaded'   = raw file uploaded by user            -> stored_relative_path LIKE 'uploads/%'

CREATE TABLE IF NOT EXISTS user_bms_exports (
    id                    CHAR(36)         CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    user_id               CHAR(36)         CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    display_name_snapshot VARCHAR(120)     NOT NULL,
    source_mis_filename   VARCHAR(255)     NOT NULL,
    stored_filename       VARCHAR(255)     NOT NULL,
    stored_relative_path  VARCHAR(255)     NOT NULL,
    stored_size_bytes     BIGINT(20) UNSIGNED NOT NULL DEFAULT 0,
    sha256_hash           CHAR(64)         NOT NULL,
    created_at            DATETIME         NOT NULL,
    PRIMARY KEY (id),
    KEY idx_user_bms_exports_user_id (user_id),
    KEY idx_user_bms_exports_created_at (created_at),
    KEY idx_user_bms_exports_user_hash (user_id, sha256_hash),
    CONSTRAINT fk_user_bms_exports_user_id FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;