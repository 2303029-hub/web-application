<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fashion_hub";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$password = $_POST['password'];

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (fullname, email, password)");
$stmt->bind_param("sss", $fullname, $email, $hashed_password);

// Execute the statement
if ($stmt->execute()) {
  echo "Registration successful!";
} else {
  echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
