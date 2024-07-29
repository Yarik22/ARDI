<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    // $phone = $_POST["phone"];
    $message = $_POST["message"];
    // $messenger = isset($_POST["messenger"]) ? "Yes" : "No";

    $to = "";
    $subject = "New form submission";
    $headers = "From: $email\r\n";
    
    $email_message = "Name: $name\n";
    $email_message .= "Email: $email\n";
    // $email_message .= "Phone: $phone\n";
    $email_message .= "Message: $message\n";
    // $email_message .= "Messenger: $messenger\n";
    
  if (mail($to, $subject, $email_message, $headers)) {
    echo "success";
} else {
    echo "error";
}

}
?>