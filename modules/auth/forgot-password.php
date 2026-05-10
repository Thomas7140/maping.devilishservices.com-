<?php
declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

maping_require_method('POST');

try {
    $data = maping_request_data();
    $email = maping_normalize_email($data['email'] ?? '');

    maping_validate_email($email);

    $pdo = maping_pdo();
    $userQuery = $pdo->prepare('SELECT id, email, is_active FROM users WHERE email = :email LIMIT 1');
    $userQuery->execute(['email' => $email]);
    $user = $userQuery->fetch();

    $response = [
        'success' => true,
        'message' => 'If the account exists, a reset token has been created',
    ];

    if (!$user || (int) $user['is_active'] !== 1) {
        maping_json_response($response);
    }

    $resetId = maping_generate_uid();
    $rawToken = bin2hex(random_bytes(32));
    $tokenHash = maping_hash_secret($rawToken);
    $requestedAt = maping_now();
    $expiresAt = gmdate('Y-m-d H:i:s', time() + 3600);

    $pdo->beginTransaction();

    $expireOld = $pdo->prepare('UPDATE password_resets SET used_at = :used_at WHERE user_id = :user_id AND used_at IS NULL');
    $expireOld->execute([
        'used_at' => $requestedAt,
        'user_id' => $user['id'],
    ]);

    $insert = $pdo->prepare(
        'INSERT INTO password_resets (id, user_id, token_hash, expires_at, used_at, created_at, requested_ip, requested_user_agent)
         VALUES (:id, :user_id, :token_hash, :expires_at, NULL, :created_at, :requested_ip, :requested_user_agent)'
    );
    $insert->execute([
        'id' => $resetId,
        'user_id' => $user['id'],
        'token_hash' => $tokenHash,
        'expires_at' => $expiresAt,
        'created_at' => $requestedAt,
        'requested_ip' => maping_client_ip(),
        'requested_user_agent' => maping_user_agent(),
    ]);

    $pdo->commit();

    $appEnv = strtolower((string) maping_first_env(['APP_ENV', 'ENVIRONMENT'], 'production'));
    if (!in_array($appEnv, ['prod', 'production'], true)) {
        $response['reset_id'] = $resetId;
        $response['reset_token'] = $rawToken;
        $response['reset_url'] = maping_base_url() . '/reset-password.php?reset_id=' . rawurlencode($resetId) . '&token=' . rawurlencode($rawToken);
    }

    maping_json_response($response);
} catch (Throwable $exception) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
