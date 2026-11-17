<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbName = getenv('DB_NAME') ?: 'fashion_hub';
$dbUser = getenv('DB_USER') ?: 'fashion_user';
$dbPassword = getenv('DB_PASSWORD') ?: 'fashion_pass';

try {
    $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {
    http_response_code(500);
    exit('Database connection failed. Check the Docker database service and configuration.');
}
?>
