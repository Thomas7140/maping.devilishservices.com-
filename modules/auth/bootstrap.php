<?php
declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/assets/uid.php';

const MAPING_ENV_PATH = '/home/devilishservices/connections/maping/.env';
const MAPING_ARGON_OPTIONS = [
    'memory_cost' => 65536,
    'time_cost' => 4,
    'threads' => 2,
];

function maping_env_candidate_paths(): array
{
    $overridePath = getenv('MAPING_ENV_FILE');
    if (is_string($overridePath) && trim($overridePath) !== '') {
        return [trim($overridePath)];
    }

    return [
        maping_project_root() . DIRECTORY_SEPARATOR . '.env',
        maping_project_root() . DIRECTORY_SEPARATOR . '.env.local',
        MAPING_ENV_PATH,
    ];
}

function maping_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE || PHP_SAPI === 'cli') {
        return;
    }

    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['SERVER_PORT']) && (int) $_SERVER['SERVER_PORT'] === 443);

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);

    session_start();
}

function maping_env_values(): array
{
    static $env = null;

    if (is_array($env)) {
        return $env;
    }

    $env = [];
    foreach (maping_env_candidate_paths() as $envPath) {
        if (!is_string($envPath) || $envPath === '' || !is_file($envPath) || !is_readable($envPath)) {
            continue;
        }

        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            continue;
        }

        foreach ($lines as $line) {
            $trimmed = trim($line);
            if ($trimmed === '' || str_starts_with($trimmed, '#')) {
                continue;
            }

            $separator = strpos($trimmed, '=');
            if ($separator === false) {
                continue;
            }

            $key = trim(substr($trimmed, 0, $separator));
            $value = trim(substr($trimmed, $separator + 1));

            if ($key === '') {
                continue;
            }

            if (strlen($value) >= 2) {
                $quote = $value[0];
                $last = $value[strlen($value) - 1];
                if (($quote === '"' || $quote === "'") && $last === $quote) {
                    $value = substr($value, 1, -1);
                }
            }

            $env[$key] = $value;
        }
    }

    return $env;
}

function maping_env(string $key, ?string $default = null): ?string
{
    $runtime = getenv($key);
    if ($runtime !== false && $runtime !== '') {
        return $runtime;
    }

    $env = maping_env_values();
    if (array_key_exists($key, $env) && $env[$key] !== '') {
        return $env[$key];
    }

    return $default;
}

function maping_first_env(array $keys, ?string $default = null): ?string
{
    foreach ($keys as $key) {
        $value = maping_env($key);
        if ($value !== null && $value !== '') {
            return $value;
        }
    }

    return $default;
}

function maping_json_response(array $payload, int $statusCode = 200): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function maping_require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== strtoupper($method)) {
        maping_json_response([
            'success' => false,
            'error' => strtoupper($method) . ' required',
        ], 405);
    }
}

function maping_request_data(): array
{
    $contentType = strtolower(trim((string) ($_SERVER['CONTENT_TYPE'] ?? '')));
    if (str_contains($contentType, 'application/json')) {
        $raw = file_get_contents('php://input');
        if ($raw === false || trim($raw) === '') {
            return [];
        }

        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            maping_json_response([
                'success' => false,
                'error' => 'Invalid JSON body',
            ], 400);
        }

        return $decoded;
    }

    if (!empty($_POST)) {
        return $_POST;
    }

    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    parse_str($raw, $data);
    return is_array($data) ? $data : [];
}

function maping_require_argon2id(): void
{
    if (!defined('PASSWORD_ARGON2ID')) {
        maping_json_response([
            'success' => false,
            'error' => 'This PHP runtime does not support Argon2id',
        ], 500);
    }
}

function maping_hash_secret(string $value): string
{
    maping_require_argon2id();
    $hash = password_hash($value, PASSWORD_ARGON2ID, MAPING_ARGON_OPTIONS);

    if (!is_string($hash) || $hash === '') {
        throw new RuntimeException('Failed to hash value');
    }

    return $hash;
}

function maping_password_needs_rehash(string $hash): bool
{
    maping_require_argon2id();
    return password_needs_rehash($hash, PASSWORD_ARGON2ID, MAPING_ARGON_OPTIONS);
}

function maping_pdo(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = maping_first_env(['DB_HOST', 'DATABASE_HOST', 'MYSQL_HOST']);
    $port = maping_first_env(['DB_PORT', 'DATABASE_PORT', 'MYSQL_PORT'], '3306');
    $name = maping_first_env(['DB_NAME', 'DB_DATABASE', 'DATABASE_NAME', 'MYSQL_DATABASE']);
    $user = maping_first_env(['DB_USER', 'DB_USERNAME', 'DATABASE_USER', 'MYSQL_USER']);
    $pass = maping_first_env(['DB_PASS', 'DB_PASSWORD', 'DATABASE_PASSWORD', 'MYSQL_PASSWORD'], '');
    $charset = maping_first_env(['DB_CHARSET', 'DATABASE_CHARSET'], 'utf8mb4');

    if ($host === null || $name === null || $user === null) {
        throw new RuntimeException('Missing database credentials in ' . MAPING_ENV_PATH);
    }

    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=%s', $host, $port, $name, $charset);
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function maping_normalize_email(mixed $value): string
{
    return strtolower(trim((string) $value));
}

function maping_validate_email(string $email): void
{
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        maping_json_response([
            'success' => false,
            'error' => 'A valid email address is required',
        ], 422);
    }
}

function maping_validate_password(string $password): void
{
    if (strlen($password) < 10) {
        maping_json_response([
            'success' => false,
            'error' => 'Password must be at least 10 characters long',
        ], 422);
    }
}

function maping_now(): string
{
    return gmdate('Y-m-d H:i:s');
}

function maping_client_ip(): ?string
{
    $value = trim((string) ($_SERVER['REMOTE_ADDR'] ?? ''));
    return $value === '' ? null : $value;
}

function maping_user_agent(): ?string
{
    $value = trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''));
    return $value === '' ? null : substr($value, 0, 255);
}

function maping_base_url(): string
{
    $configured = maping_first_env(['APP_URL', 'MAPING_APP_URL']);
    if ($configured !== null) {
        return rtrim($configured, '/');
    }

    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['SERVER_PORT']) && (int) $_SERVER['SERVER_PORT'] === 443);

    $scheme = $isHttps ? 'https' : 'http';
    $host = (string) ($_SERVER['HTTP_HOST'] ?? 'localhost');
    $scriptName = (string) ($_SERVER['SCRIPT_NAME'] ?? '');
    $dir = str_replace('\\', '/', dirname($scriptName));

    return rtrim($scheme . '://' . $host . ($dir === '/' ? '' : $dir), '/');
}

function maping_is_production(): bool
{
    $value = strtolower((string) maping_first_env(['APP_ENV', 'ENVIRONMENT'], 'production'));
    return in_array($value, ['prod', 'production'], true);
}

function maping_public_user(array $row): array
{
    return [
        'id' => $row['id'],
        'email' => $row['email'],
        'display_name' => $row['display_name'],
        'created_at' => $row['created_at'],
        'last_login_at' => $row['last_login_at'],
    ];
}

function maping_current_user(): ?array
{
    static $user = false;

    if (is_array($user)) {
        return $user;
    }

    if ($user === null) {
        return null;
    }

    $userId = trim((string) ($_SESSION['auth_user_id'] ?? ''));
    if ($userId === '') {
        $user = null;
        return null;
    }

    $query = maping_pdo()->prepare(
        'SELECT id, email, display_name, is_active, created_at, updated_at, last_login_at
         FROM users
         WHERE id = :id
         LIMIT 1'
    );
    $query->execute(['id' => $userId]);
    $row = $query->fetch();

    if (!$row || (int) $row['is_active'] !== 1) {
        $user = null;
        return null;
    }

    $user = $row;
    return $user;
}

function maping_require_auth(): array
{
    $user = maping_current_user();
    if (!is_array($user)) {
        maping_json_response([
            'success' => false,
            'error' => 'Authentication required',
        ], 401);
    }

    return $user;
}

function maping_project_root(): string
{
    return dirname(__DIR__, 2);
}

function maping_safe_path_segment(string $value, string $fallback = 'user'): string
{
    $value = trim($value);
    if ($value === '') {
        return $fallback;
    }

    // Preserve real map/user names, including UTF-8 and Windows-1252 characters such as «êT».
    // Only strip characters that are unsafe in paths or invalid on common filesystems.
    $value = str_replace(["/", "\\"], '_', $value);
    $value = preg_replace('/[\x00-\x1F\x7F]+/', '_', $value) ?? $value;
    $value = preg_replace('/[<>:"|?*]+/', '_', $value) ?? $value;
    $value = preg_replace('/\s+/u', ' ', (string) $value) ?? preg_replace('/\s+/', ' ', (string) $value);
    $value = trim((string) $value, " .\t\n\r\0\x0B");

    // Avoid Windows reserved device names when files are later copied or downloaded.
    if (preg_match('/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\.|$)/i', $value)) {
        $value = '_' . $value;
    }

    return $value === '' ? $fallback : $value;
}

function maping_user_folder_name(array $user): array
{
    $displayName = trim((string) ($user['display_name'] ?? ''));
    if ($displayName === '') {
        $displayName = (string) ($user['email'] ?? $user['id']);
    }

    return [
        'display_name' => $displayName,
        'folder_name' => maping_safe_path_segment($displayName, (string) $user['id']),
    ];
}

function maping_user_upload_dir(array $user): array
{
    // Converted/loadable map files live here and are the only files recorded in user_map_uploads.
    $folder = maping_user_folder_name($user);
    $absolutePath = maping_project_root() . DIRECTORY_SEPARATOR . 'converted-maps' . DIRECTORY_SEPARATOR . $folder['folder_name'];
    $relativePath = 'converted-maps/' . $folder['folder_name'];

    return [
        'display_name' => $folder['display_name'],
        'folder_name' => $folder['folder_name'],
        'absolute_path' => $absolutePath,
        'relative_path' => $relativePath,
    ];
}

function maping_user_raw_upload_dir(array $user): array
{
    // Original uploaded source files live here. BMS originals are deliberately not recorded in the DB.
    $folder = maping_user_folder_name($user);
    $absolutePath = maping_project_root() . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $folder['folder_name'];
    $relativePath = 'uploads/' . $folder['folder_name'];

    return [
        'display_name' => $folder['display_name'],
        'folder_name' => $folder['folder_name'],
        'absolute_path' => $absolutePath,
        'relative_path' => $relativePath,
    ];
}

function maping_ensure_directory(string $path): void
{
    if (is_dir($path)) {
        return;
    }

    if (!mkdir($path, 0755, true) && !is_dir($path)) {
        throw new RuntimeException('Could not create directory: ' . $path);
    }
}

function maping_unique_filename(string $directory, string $baseName, string $extension): string
{
    $safeBaseName = maping_safe_path_segment($baseName, 'map');
    $safeExtension = strtolower(ltrim($extension, '.'));
    $candidate = $safeBaseName . '.' . $safeExtension;

    if (!file_exists($directory . DIRECTORY_SEPARATOR . $candidate)) {
        return $candidate;
    }

    return $safeBaseName . '_' . gmdate('Ymd_His') . '_' . substr(maping_generate_uid(), 0, 8) . '.' . $safeExtension;
}


function maping_bash_binary(): string
{
    $configured = maping_first_env(['MAPING_BASH_BIN', 'BASH_BIN']);
    if ($configured !== null && trim($configured) !== '') {
        return trim($configured);
    }

    foreach (['/usr/bin/bash', '/bin/bash', 'bash'] as $candidate) {
        if ($candidate === 'bash' || is_file($candidate)) {
            return $candidate;
        }
    }

    return 'bash';
}

function maping_default_bms_converter_template(): ?string
{
    $nativeTemplate = maping_native_bms_converter_template();
    if ($nativeTemplate !== null) {
        return $nativeTemplate;
    }

    return maping_wine_bms_converter_template();
}

function maping_native_bms_converter_template(): ?string
{
    // Bundled PHP-native BMS converter. This avoids Wine and is safer for WHM/cPanel hosting.
    $nativeWrapper = maping_project_root() . DIRECTORY_SEPARATOR . 'scripts' . DIRECTORY_SEPARATOR . 'maping-bms-convert-native.sh';
    if (!is_file($nativeWrapper)) {
        return null;
    }

    return escapeshellcmd(maping_bash_binary()) . ' ' . escapeshellarg($nativeWrapper) . ' {input} {output}';
}

function maping_wine_bms_converter_template(): ?string
{
    $wineWrapper = maping_project_root() . DIRECTORY_SEPARATOR . 'scripts' . DIRECTORY_SEPARATOR . 'maping-bms-convert-wine.sh';
    if (!is_file($wineWrapper)) {
        return null;
    }

    return escapeshellcmd(maping_bash_binary()) . ' ' . escapeshellarg($wineWrapper) . ' {input} {output}';
}

function maping_bms_converter_template(): ?string
{
    $configured = maping_first_env(['MAPING_BMS_TO_MIS_COMMAND', 'BMS_TO_MIS_COMMAND']);
    if ($configured !== null && trim((string) $configured) !== '') {
        return $configured;
    }

    // Prefer a configured native converter. Otherwise use the bundled Wine wrapper.
    // The wrapper is invoked through bash so uploaded scripts do not need +x permission.
    return maping_default_bms_converter_template();
}

function maping_has_bms_converter(): bool
{
    $template = maping_bms_converter_template();
    return $template !== null && trim($template) !== '';
}

function maping_require_bms_converter(): string
{
    $template = maping_bms_converter_template();
    if ($template === null || trim($template) === '') {
        throw new RuntimeException('BMS upload is not configured on this server. Upload a .mis file, install Wine, or configure MAPING_BMS_NATIVE_COMMAND / MAPING_BMS_TO_MIS_COMMAND.');
    }

    return $template;
}

function maping_run_bms_converter_template(string $template, string $inputPath, string $outputPath): array
{
    $command = str_replace(
        ['{input}', '{output}'],
        [escapeshellarg($inputPath), escapeshellarg($outputPath)],
        $template
    );

    $descriptorSpec = [
        0 => ['pipe', 'r'],
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w'],
    ];

    $process = proc_open($command, $descriptorSpec, $pipes, maping_project_root());
    if (!is_resource($process)) {
        throw new RuntimeException('Could not start BMS converter process');
    }

    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);

    $exitCode = proc_close($process);

    return [
        'command' => $template,
        'stdout' => trim((string) $stdout),
        'stderr' => trim((string) $stderr),
        'exit_code' => $exitCode,
        'ok' => ($exitCode === 0 && is_file($outputPath) && filesize($outputPath) > 0),
    ];
}

function maping_bms_converter_candidates(string $primaryTemplate): array
{
    $candidates = [];
    foreach ([$primaryTemplate, maping_native_bms_converter_template(), maping_wine_bms_converter_template()] as $candidate) {
        if ($candidate !== null && trim($candidate) !== '' && !in_array($candidate, $candidates, true)) {
            $candidates[] = $candidate;
        }
    }
    return $candidates;
}

function maping_convert_bms_to_mis(string $inputPath, string $outputPath): array
{
    $primaryTemplate = maping_require_bms_converter();
    $failures = [];

    foreach (maping_bms_converter_candidates($primaryTemplate) as $template) {
        @unlink($outputPath);
        $result = maping_run_bms_converter_template($template, $inputPath, $outputPath);
        if ($result['ok']) {
            return $result;
        }

        $combinedOutput = trim((string) (($result['stderr'] ?? '') ?: ($result['stdout'] ?? '')));
        $failures[] = $combinedOutput !== '' ? $combinedOutput : ('converter exited with code ' . (string) ($result['exit_code'] ?? 'unknown'));
    }

    $message = trim(implode("\n", array_unique($failures)));
    if (stripos($message, 'wine') !== false && (stripos($message, 'not found') !== false || stripos($message, 'missing') !== false || stripos($message, 'code 127') !== false)) {
        $message .= "\nWine is not installed or is not available to PHP. Install Wine, set MAPING_WINE_BIN to the full wine path, or configure MAPING_BMS_NATIVE_COMMAND / MAPING_BMS_TO_MIS_COMMAND to a Linux BMS-to-MIS converter.";
    }

    throw new RuntimeException('BMS conversion failed: ' . ($message !== '' ? $message : 'unknown converter error'));
}

maping_start_session();
