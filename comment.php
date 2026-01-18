<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Database connection details
$servername = "sql211.infinityfree.com"; 
$username = "if0_39112826";             
$password = "627746Ny";                 
$dbname = "if0_39112826_portfolio_db";  

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['name']) && isset($_POST['comment'])) {
        header("Location: projects.html?status=db_connection_error");
        exit();
    } else {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
        exit();
    }
}

// --- Handle Comment Submission (POST request) ---
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if name and comment are set and not empty
    if (isset($_POST['name']) && isset($_POST['comment']) && !empty(trim($_POST['name'])) && !empty(trim($_POST['comment']))) {
        $name = $conn->real_escape_string($_POST['name']);
        $comment = $conn->real_escape_string($_POST['comment']);

        $sql = "INSERT INTO comments (name, comment) VALUES ('$name', '$comment')";

        if ($conn->query($sql) === TRUE) {
            header("Location: projects.html?status=comment_success");
            exit();
        } else {
            header("Location: projects.html?status=comment_error");
            exit();
        }
    } else {
        header("Location: projects.html?status=empty_fields");
        exit();
    }
}

// --- Handle Comment Fetching (GET request or default) ---

header('Content-Type: application/json'); 
header('Access-Control-Allow-Origin: *'); 

$sql = "SELECT name, comment, submission_date FROM comments ORDER BY submission_date DESC";
$result = $conn->query($sql);

$comments = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
}

$conn->close();

echo json_encode($comments); 
?>