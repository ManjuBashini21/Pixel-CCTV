<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['number']); 
    $email = htmlspecialchars($_POST['email']); // User's email
    $address = htmlspecialchars($_POST['address']);

    $to = "manjubashini2110@gmail.com"; // Replace with your receiving email
    $subject = "New Form Submission";

    $message = "
    <html>
    <head><title>Form Submission</title></head>
    <body>
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Phone Number:</strong> $phone</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Address:</strong> $address</p>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n"; // Now using user-provided email
    $headers .= "Reply-To: $email" . "\r\n"; 

    if (mail($to, $subject, $message, $headers)) {
        echo "<script>alert('Form submitted successfully!'); window.location.href='index.php';</script>";
    } else {
        echo "<script>alert('Submission failed. Please try again.'); window.location.href='index.php';</script>";
    }
}
?>
