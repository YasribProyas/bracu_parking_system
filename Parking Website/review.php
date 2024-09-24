<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $category = $_POST['category'];
    $review = $_POST['review'];
    $rating = $_POST['rating'];

    $sql = "INSERT INTO reviews (username, category, review, rating) VALUES ('$username', '$category', '$review', '$rating')";

    if ($conn->query($sql) === TRUE) {
        echo "Review submitted successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
