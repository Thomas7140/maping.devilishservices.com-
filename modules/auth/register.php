<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

maping_require_method('POST');

try {
    $data = maping_request_data();
    $email = maping_normalize_email($data['email'] ?? '');
    $displayName = trim((string) ($data['display_name'] ?? $data['name'] ?? ''));
    $password = (string) ($data['password'] ?? '');

    maping_validate_email($email);
    maping_validate_password($password);

    $pdo = maping_pdo();
    $existing = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $existing->execute(['email' => $email]);

    if ($existing->fetch()) {
        maping_json_response([
            'success' => false,
            'error' => 'An account with that email already exists',
        ], 409);
    }

    $now = maping_now();
    $userId = maping_generate_uid();
    $passwordHash = maping_hash_secret($password);

    $insert = $pdo->prepare(
        'INSERT INTO users (id, email, display_name, password_hash, is_active, created_at, updated_at, last_login_at)
         VALUES (:id, :email, :display_name, :password_hash, 1, :created_at, :updated_at, NULL)'
    );
    $insert->execute([
        'id' => $userId,
        'email' => $email,
        'display_name' => $displayName === '' ? null : $displayName,
        'password_hash' => $passwordHash,
        'created_at' => $now,
        'updated_at' => $now,
    ]);

    session_regenerate_id(true);
    $_SESSION['auth_user_id'] = $userId;
    $_SESSION['auth_email'] = $email;

    maping_json_response([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => $userId,
            'email' => $email,
            'display_name' => $displayName === '' ? null : $displayName,
            'created_at' => $now,
            'last_login_at' => null,
        ],
    ], 201);
} catch (Throwable $exception) {
    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
