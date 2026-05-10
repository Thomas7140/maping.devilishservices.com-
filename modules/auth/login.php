<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

maping_require_method('POST');

try {
    $data = maping_request_data();
    $email = maping_normalize_email($data['email'] ?? '');
    $password = (string) ($data['password'] ?? '');

    maping_validate_email($email);
    if ($password === '') {
        maping_json_response([
            'success' => false,
            'error' => 'Password is required',
        ], 422);
    }

    $pdo = maping_pdo();
    $query = $pdo->prepare(
        'SELECT id, email, display_name, password_hash, is_active, created_at, updated_at, last_login_at
         FROM users
         WHERE email = :email
         LIMIT 1'
    );
    $query->execute(['email' => $email]);
    $user = $query->fetch();

    if (!$user || (int) $user['is_active'] !== 1 || !password_verify($password, $user['password_hash'])) {
        maping_json_response([
            'success' => false,
            'error' => 'Invalid email or password',
        ], 401);
    }

    $now = maping_now();
    $newHash = $user['password_hash'];
    if (maping_password_needs_rehash($user['password_hash'])) {
        $newHash = maping_hash_secret($password);
    }

    $update = $pdo->prepare(
        'UPDATE users SET password_hash = :password_hash, updated_at = :updated_at, last_login_at = :last_login_at WHERE id = :id'
    );
    $update->execute([
        'password_hash' => $newHash,
        'updated_at' => $now,
        'last_login_at' => $now,
        'id' => $user['id'],
    ]);

    session_regenerate_id(true);
    $_SESSION['auth_user_id'] = $user['id'];
    $_SESSION['auth_email'] = $user['email'];

    $user['last_login_at'] = $now;

    maping_json_response([
        'success' => true,
        'message' => 'Login successful',
        'user' => maping_public_user($user),
    ]);
} catch (Throwable $exception) {
    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
