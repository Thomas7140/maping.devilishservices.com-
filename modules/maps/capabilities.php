<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/auth/bootstrap.php';

maping_require_method('GET');

$bmsEnabled = trim((string) maping_bms_converter_template()) !== '';

maping_json_response([
    'success' => true,
    'upload' => [
        'accept' => $bmsEnabled ? ['mis', 'bms'] : ['mis'],
        'bms_enabled' => $bmsEnabled,
        'bms_message' => $bmsEnabled
            ? 'MIS and BMS uploads are available.'
            : 'BMS conversion is not configured on this server yet. Upload a .mis file.',
    ],
]);