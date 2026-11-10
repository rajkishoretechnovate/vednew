<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name      = strip_tags(trim($_POST["name"] ?? ''));
    $phone     = strip_tags(trim($_POST["phone"] ?? ''));
    $email     = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $country   = strip_tags(trim($_POST["country"] ?? 'Not Specified'));
    $treatment = strip_tags(trim($_POST["treatment"] ?? 'Not Specified'));
    $message   = strip_tags(trim($_POST["message"] ?? 'No message provided'));

    if (empty($name) || empty($phone)) {
        echo json_encode(["status" => "error", "message" => "Please enter your name and phone number."]);
        exit;
    }

    // Post securely via Web3Forms API (Bypasses all SMTP/Port blocks)
    $postData = [
        'access_key' => '1a51d927-5c38-48c9-bd66-48d93f633f7d',
        'subject'    => 'New Consultation Inquiry: ' . $name,
        'from_name'  => 'VAD MedConsult Website',
        'name'       => $name,
        'phone'      => $phone,
        'email'      => $email,
        'country'    => $country,
        'treatment'  => $treatment,
        'message'    => $message
    ];

    $ch = curl_init('https://api.web3forms.com/submit');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response, true);

    if ($result && $result['success'] == true) {
        echo json_encode(["status" => "success", "message" => "Thank you, " . $name . "! Your consultation request has been received. Our team will contact you shortly."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send message. Please try again later."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>