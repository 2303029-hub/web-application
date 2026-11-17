<?php
require __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: Signup.html');
    exit;
}

$fullname = trim($_POST['fullname'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm-password'] ?? '';

if ($fullname === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    exit('Enter a name, valid email, and password with at least 8 characters. <a href="Signup.html">Go back</a>');
}
if ($password !== $confirmPassword) {
    exit('Passwords do not match. <a href="Signup.html">Go back</a>');
}

$hash = password_hash($password, PASSWORD_DEFAULT);
try {
    $stmt = $conn->prepare('INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $fullname, $email, $hash);
    $stmt->execute();
    $stmt->close();
    header('Location: login.html?registered=1');
    exit;
} catch (mysqli_sql_exception $e) {
    if ($e->getCode() === 1062) {
        exit('This email is already registered. <a href="Signup.html">Try another email</a>');
    }
    http_response_code(500);
    exit('Registration failed. Please try again later.');
} finally {
    $conn->close();
}
?>
