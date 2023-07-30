<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $substackApiKey = "YOUR_SUBSTACK_API_KEY"; // Replace with your actual API key
    $newsletterUUID = "YOUR_NEWSLETTER_UUID"; // Replace with the UUID of your Substack newsletter

    // Data validation
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Invalid email address
        echo "Please enter a valid email address.";
    } else {
        // Subscribe the email to your Substack newsletter using the Substack API
        $url = "https://api.substack.com/v3/subscriptions";
        $data = array(
            "email" => $email,
            "uuid" => $newsletterUUID,
            // Additional data, if needed (e.g., "tags" for different subscription categories)
        );

        $options = array(
            "http" => array(
                "header" => "Authorization: Bearer $substackApiKey\r\n" . "Content-Type: application/json\r\n",
                "method" => "POST",
                "content" => json_encode($data)
            )
        );

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);

        if ($result === false) {
            // Error handling if the subscription fails
            echo "Error subscribing to the newsletter. Please try again later.";
        } else {
            // Success message if the subscription is successful
            echo "Thank you for subscribing to our newsletter!";
        }
    }
}
?>
