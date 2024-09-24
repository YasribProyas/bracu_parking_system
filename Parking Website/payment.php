<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "parking_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $vehicle = $_POST['vehicle'];
    $hours = $_POST['hours'];

    // Placeholder for payment calculation (add your own logic here)
    $rate = ($vehicle == 'car') ? 50 : 30; // Set these as needed
    $total = $rate * $hours;

    $sql = "INSERT INTO payments (vehicle, hours, total_amount) VALUES ('$vehicle', '$hours', '$total')";

    if ($conn->query($sql) === TRUE) {
        echo "Payment successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
