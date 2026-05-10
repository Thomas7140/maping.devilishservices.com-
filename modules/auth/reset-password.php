<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

maping_require_method('POST');

try {
    $data = maping_request_data();
    $resetId = trim((string) ($data['reset_id'] ?? ''));
    $token = trim((string) ($data['token'] ?? ''));
    $newPassword = (string) ($data['password'] ?? $data['new_password'] ?? '');

    if (!preg_match('/^[a-f0-9-]{36}$/i', $resetId)) {
        maping_json_response([
            'success' => false,
            'error' => 'A valid reset id is required',
        ], 422);
    }

    if ($token === '') {
        maping_json_response([
            'success' => false,
            'error' => 'Reset token is required',
        ], 422);
    }

    maping_validate_password($newPassword);

    $pdo = maping_pdo();
    $query = $pdo->prepare(
        'SELECT pr.id, pr.user_id, pr.token_hash, pr.expires_at, pr.used_at,
                u.id AS auth_user_id, u.email, u.display_name, u.created_at, u.last_login_at
         FROM password_resets pr
         INNER JOIN users u ON u.id = pr.user_id
         WHERE pr.id = :id
         LIMIT 1'
    );
    $query->execute(['id' => $resetId]);
    $reset = $query->fetch();

    if (!$reset || $reset['used_at'] !== null || strtotime((string) $reset['expires_at']) < time()) {
        maping_json_response([
            'success' => false,
            'error' => 'This reset token is invalid or expired',
        ], 400);
    }

    if (!password_verify($token, $reset['token_hash'])) {
        maping_json_response([
            'success' => false,
            'error' => 'This reset token is invalid or expired',
        ], 400);
    }

    $now = maping_now();
    $passwordHash = maping_hash_secret($newPassword);

    $pdo->beginTransaction();

    $updateUser = $pdo->prepare('UPDATE users SET password_hash = :password_hash, updated_at = :updated_at WHERE id = :id');
    $updateUser->execute([
        'password_hash' => $passwordHash,
        'updated_at' => $now,
        'id' => $reset['user_id'],
    ]);

    $markUsed = $pdo->prepare('UPDATE password_resets SET used_at = :used_at WHERE user_id = :user_id AND used_at IS NULL');
    $markUsed->execute([
        'used_at' => $now,
        'user_id' => $reset['user_id'],
    ]);

    $pdo->commit();

    session_regenerate_id(true);
    $_SESSION['auth_user_id'] = $reset['auth_user_id'];
    $_SESSION['auth_email'] = $reset['email'];

    maping_json_response([
        'success' => true,
        'message' => 'Password reset successful',
        'user' => [
            'id' => $reset['auth_user_id'],
            'email' => $reset['email'],
            'display_name' => $reset['display_name'],
            'created_at' => $reset['created_at'],
            'last_login_at' => $reset['last_login_at'],
        ],
    ]);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
