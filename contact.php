<?php
// Database connection details
$servername = "sql211.infinityfree.com";
$username = "if0_39112826";
$password = "627746Ny";
$dbname = "if0_39112826_portfolio_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    header("Location: about-me.html?status=contact_db_error");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message']) &&
        !empty(trim($_POST['name'])) && !empty(trim($_POST['email'])) && !empty(trim($_POST['message']))) {

        $name = $conn->real_escape_string($_POST['name']);
        $email = $conn->real_escape_string($_POST['email']);
        $message = $conn->real_escape_string($_POST['message']);

        $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";

        if ($conn->query($sql) === TRUE) {
            header("Location: about-me.html?status=contact_success"); // 
            exit(); // 
        } else {
            header("Location: about-me.html?status=contact_error"); // 
            exit(); // 
        }
    } else {
        header("Location: about-me.html?status=contact_empty_fields"); // 
        exit(); // 
    }
}
$conn->close();
?>