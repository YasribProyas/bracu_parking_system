<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful. You can now <a href='../login.html'>login</a>.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
