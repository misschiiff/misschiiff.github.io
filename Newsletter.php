<?php

require 'vendor/autoload.php'; // This loads PHPMailer from the Composer autoloader

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    // Replace 'YOUR_BOT_TOKEN' with your Telegram bot's API token
    $botToken = '6411861031:AAGQIl3iSo_eHcrsSu0hzOuJa0yJy2-ZtRg';

    // Replace 'YOUR_CHAT_ID' with the chat ID of your Telegram bot
    $chatId = 'MischifBot';

    // Prepare the message
    $message = "New subscriber: $email";

    // Create the Telegram Bot API URL
    $telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($message);

    // Send the message to your Telegram bot
    $response = file_get_contents($telegramApiUrl);

    if ($response) {
        echo "Email stored successfully!";
    } else {
        echo "Failed to store email.";
    }
}
?>