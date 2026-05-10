<?php
declare(strict_types=1);

require_once __DIR__ . '/modules/auth/bootstrap.php';

maping_require_method('POST');

try {
    $user = maping_require_auth();

    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) === 0) {
        maping_json_response(['success' => false, 'error' => 'Empty request body'], 400);
    }

    if (strlen($raw) > 20 * 1024 * 1024) {
        maping_json_response(['success' => false, 'error' => 'Map file is too large'], 413);
    }

    $data = json_decode($raw, true);
    if (!is_array($data)) {
        maping_json_response(['success' => false, 'error' => 'Invalid JSON'], 400);
    }

    $filename = isset($data['filename']) ? (string) $data['filename'] : 'edited.mis';
    $content = isset($data['content']) ? (string) $data['content'] : '';

    if ($content === '') {
        maping_json_response(['success' => false, 'error' => 'Map content is required'], 422);
    }

    $filename = basename(str_replace('\\', '/', $filename));
    $baseName = pathinfo($filename, PATHINFO_FILENAME);
    if (!preg_match('/\.mis$/i', $filename)) {
        $filename .= '.mis';
    }

    $uploadInfo = maping_user_upload_dir($user);
    maping_ensure_directory(maping_project_root() . DIRECTORY_SEPARATOR . 'completed-maps');

    // Save finished/editor-created maps to completed-maps/<display name>/ instead of converted-maps/.
    $completedFolderName = maping_safe_path_segment((string) $uploadInfo['display_name'], (string) $user['id']);
    $completedAbsolutePath = maping_project_root() . DIRECTORY_SEPARATOR . 'completed-maps' . DIRECTORY_SEPARATOR . $completedFolderName;
    $completedRelativePath = 'completed-maps/' . $completedFolderName;
    maping_ensure_directory($completedAbsolutePath);

    $storedFileName = maping_unique_filename($completedAbsolutePath, $baseName, 'mis');
    $storedAbsolutePath = $completedAbsolutePath . DIRECTORY_SEPARATOR . $storedFileName;
    $storedRelativePath = $completedRelativePath . '/' . $storedFileName;

    $bytes = file_put_contents($storedAbsolutePath, $content, LOCK_EX);
    if ($bytes === false) {
        throw new RuntimeException('Could not write map file');
    }

    $uploadId = maping_generate_uid();
    $now = maping_now();
    $checksum = hash_file('sha256', $storedAbsolutePath);

    $insert = maping_pdo()->prepare(
        'INSERT INTO user_map_uploads (
            id, user_id, display_name_snapshot, original_filename, original_extension,
            stored_filename, stored_relative_path, stored_size_bytes, sha256_hash,
            converted_from_extension, conversion_status, created_at
         ) VALUES (
            :id, :user_id, :display_name_snapshot, :original_filename, :original_extension,
            :stored_filename, :stored_relative_path, :stored_size_bytes, :sha256_hash,
            :converted_from_extension, :conversion_status, :created_at
         )'
    );
    $insert->execute([
        'id' => $uploadId,
        'user_id' => $user['id'],
        'display_name_snapshot' => $uploadInfo['display_name'],
        'original_filename' => $filename,
        'original_extension' => 'mis',
        'stored_filename' => $storedFileName,
        'stored_relative_path' => $storedRelativePath,
        'stored_size_bytes' => $bytes,
        'sha256_hash' => $checksum,
        'converted_from_extension' => null,
        'conversion_status' => 'saved',
        'created_at' => $now,
    ]);

    maping_json_response([
        'success' => true,
        'upload_id' => $uploadId,
        'filename' => $storedFileName,
        'bytes' => $bytes,
        'path' => $storedRelativePath,
        'display_name' => $uploadInfo['display_name'],
    ]);
} catch (Throwable $exception) {
    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
