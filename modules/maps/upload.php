<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/auth/bootstrap.php';
require_once __DIR__ . '/upload_history.php';

maping_require_method('POST');

try {
    $user = maping_require_auth();

    if (empty($_FILES)) {
        maping_json_response([
            'success' => false,
            'error' => 'A map file upload is required',
        ], 422);
    }

    $upload = $_FILES['map_file'] ?? reset($_FILES);
    if (!is_array($upload)) {
        maping_json_response([
            'success' => false,
            'error' => 'Invalid uploaded file payload',
        ], 400);
    }

    $errorCode = (int) ($upload['error'] ?? UPLOAD_ERR_NO_FILE);
    if ($errorCode !== UPLOAD_ERR_OK) {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'Uploaded file exceeds the server limit',
            UPLOAD_ERR_FORM_SIZE => 'Uploaded file exceeds the form limit',
            UPLOAD_ERR_PARTIAL => 'Uploaded file was only partially received',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Server temporary directory is missing',
            UPLOAD_ERR_CANT_WRITE => 'Server could not write uploaded file',
            UPLOAD_ERR_EXTENSION => 'A PHP extension blocked the file upload',
        ];

        maping_json_response([
            'success' => false,
            'error' => $errors[$errorCode] ?? 'File upload failed',
        ], 400);
    }

    $tmpPath = (string) ($upload['tmp_name'] ?? '');
    $originalName = trim((string) ($upload['name'] ?? ''));
    $originalName = basename(str_replace('\\', '/', $originalName));
    $sizeBytes = (int) ($upload['size'] ?? 0);

    if ($tmpPath === '' || !is_uploaded_file($tmpPath)) {
        maping_json_response([
            'success' => false,
            'error' => 'Uploaded file could not be verified',
        ], 400);
    }

    if ($sizeBytes <= 0) {
        maping_json_response([
            'success' => false,
            'error' => 'Uploaded file is empty',
        ], 422);
    }

    if ($sizeBytes > 50 * 1024 * 1024) {
        maping_json_response([
            'success' => false,
            'error' => 'Uploaded file is too large',
        ], 413);
    }

    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    if (!in_array($extension, ['mis', 'bms'], true)) {
        maping_json_response([
            'success' => false,
            'error' => 'Only .mis and .bms map uploads are supported',
        ], 422);
    }

    $hasBmsConverter = $extension !== 'bms' || trim((string) maping_bms_converter_template()) !== '';
    if ($extension === 'bms' && !$hasBmsConverter) {
        maping_json_response([
            'success' => false,
            'error' => 'BMS conversion is not configured. The bundled PHP-native converter is missing; restore scripts/maping-bms-to-mis-native.php and scripts/maping-bms-convert-native.sh, or configure MAPING_BMS_TO_MIS_COMMAND.',
        ], 500);
    }

    $convertedUploadInfo = maping_user_upload_dir($user);
    $rawUploadInfo = maping_user_raw_upload_dir($user);
    maping_ensure_directory(maping_project_root() . DIRECTORY_SEPARATOR . 'converted-maps');
    maping_ensure_directory(maping_project_root() . DIRECTORY_SEPARATOR . 'completed-maps');
    maping_ensure_directory(maping_project_root() . DIRECTORY_SEPARATOR . 'uploads');
    maping_ensure_directory($convertedUploadInfo['absolute_path']);
    maping_ensure_directory($rawUploadInfo['absolute_path']);

    $baseName = pathinfo($originalName, PATHINFO_FILENAME);
    // The loadable/editor file is always .mis and remains the only file recorded in user_map_uploads.
    $storedOutputExtension = 'mis';
    $storedFileName = $baseName . '.' . $storedOutputExtension;
    // Keep the map filename stable. Re-uploading/converting the same map overwrites the
    // existing loadable .mis instead of creating timestamp/hash copies.
    $storedFileName = basename(str_replace('\\', '/', $storedFileName));

    // Normal .mis uploads belong in the user's uploads/<display-name>/ folder.
    // Converted .bms output remains in converted-maps/<display-name>/, while the raw .bms
    // source also stays in uploads/<display-name>/ and is never written to the DB.
    $dbUploadInfo = ($extension === 'mis') ? $rawUploadInfo : $convertedUploadInfo;
    $storedAbsolutePath = $dbUploadInfo['absolute_path'] . DIRECTORY_SEPARATOR . $storedFileName;
    $storedRelativePath = $dbUploadInfo['relative_path'] . '/' . $storedFileName;

    $convertedFromExtension = null;
    $converterMeta = null;
    $sourceBmsFileName = null;
    $sourceBmsRelativePath = null;

    if ($extension === 'mis') {
        if (!move_uploaded_file($tmpPath, $storedAbsolutePath)) {
            throw new RuntimeException('Could not move uploaded MIS file into the user uploads folder');
        }
    } else {
        $convertedFromExtension = 'bms';
        $sourceBmsFileName = $baseName . '.bms';
        // Raw BMS source is kept for reference only and may be overwritten by a newer upload.
        $sourceBmsFileName = basename(str_replace('\\', '/', $sourceBmsFileName));
        $sourceBmsAbsolutePath = $rawUploadInfo['absolute_path'] . DIRECTORY_SEPARATOR . $sourceBmsFileName;
        $sourceBmsRelativePath = $rawUploadInfo['relative_path'] . '/' . $sourceBmsFileName;

        if (!move_uploaded_file($tmpPath, $sourceBmsAbsolutePath)) {
            throw new RuntimeException('Could not move uploaded BMS file into the uploads folder');
        }

        // Convert from the preserved BMS source. Do not delete it, and do not create a DB row for it.
        $converterMeta = maping_convert_bms_to_mis($sourceBmsAbsolutePath, $storedAbsolutePath);
    }

    $storedSizeBytes = (int) (filesize($storedAbsolutePath) ?: 0);
    $checksum = hash_file('sha256', $storedAbsolutePath);
    $now = maping_now();
    $uploadId = maping_generate_uid();

    $historyWarning = null;

    $historyWarning = maping_record_user_upload($user, $dbUploadInfo, [
        'id' => $uploadId,
        // Important: never save the raw .bms file details into user_map_uploads.
        // For BMS uploads, this DB row represents only the converted/loadable .mis file.
        'original_filename' => ($extension === 'bms' ? $storedFileName : $originalName),
        'original_extension' => $storedOutputExtension,
        'stored_filename' => $storedFileName,
        'stored_relative_path' => $storedRelativePath,
        'stored_size_bytes' => $storedSizeBytes,
        'sha256_hash' => $checksum ?: '',
        'converted_from_extension' => $convertedFromExtension,
        'conversion_status' => ($convertedFromExtension === null ? 'uploaded' : 'converted'),
        'created_at' => $now,
    ]);

    maping_json_response([
        'success' => true,
        'message' => ($convertedFromExtension === null ? 'MIS uploaded successfully' : 'BMS converted and saved as MIS successfully'),
        'upload' => [
            'id' => $uploadId,
            'user_id' => $user['id'],
            'display_name' => $dbUploadInfo['display_name'],
            'folder' => $dbUploadInfo['relative_path'],
            'original_filename' => ($extension === 'bms' ? $storedFileName : $originalName),
            'original_extension' => $storedOutputExtension,
            'stored_filename' => $storedFileName,
            'stored_path' => $storedRelativePath,
            'stored_size_bytes' => $storedSizeBytes,
            'sha256_hash' => $checksum,
            'conversion_status' => ($convertedFromExtension === null ? 'uploaded' : 'converted'),
            'converted_from_extension' => $convertedFromExtension,
            'warning' => $historyWarning,
            'source_bms_filename' => $sourceBmsFileName,
            'source_bms_path' => $sourceBmsRelativePath,
            'source_bms_saved_to_db' => false,
        ],
        'converter' => $converterMeta,
    ], 201);
} catch (Throwable $exception) {
    maping_json_response([
        'success' => false,
        'error' => $exception->getMessage(),
    ], 500);
}
