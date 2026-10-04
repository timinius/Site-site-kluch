<?php
/**
 * WEB.EKB: приём заявок с формы на хостинге с PHP.
 * Включается в js/main.js: FORM_CONFIG.provider = 'php'.
 * Настройки (токен бота, чат, почта) лежат в send-config.php рядом, см. send-config.example.php.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$config = is_file(__DIR__ . '/send-config.php') ? require __DIR__ . '/send-config.php' : [];

$clean = static function ($value, $max) {
    $value = trim((string) $value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value);
    return mb_substr($value, 0, $max);
};

/* Поле-ловушка для ботов: человек его не видит и не заполняет */
if (!empty($_POST['company'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name    = $clean($_POST['name'] ?? '', 80);
$contact = $clean($_POST['contact'] ?? '', 80);
$type    = $clean($_POST['site_type'] ?? '', 60);
$message = trim(mb_substr((string) ($_POST['message'] ?? ''), 0, 1500));

if (mb_strlen($name) < 2 || mb_strlen($contact) < 5) {
    http_response_code(422);
    echo json_encode(['ok' => false]);
    exit;
}

$text = "Новая заявка с сайта WEB.EKB\n\n"
    . "Имя: {$name}\n"
    . "Телефон или Telegram: {$contact}\n"
    . 'Тип сайта: ' . ($type !== '' ? $type : 'пока не знает') . "\n"
    . 'О задаче: ' . ($message !== '' ? $message : 'не указано');

$sent = false;

if (!empty($config['telegram_token']) && !empty($config['telegram_chat_id'])) {
    $url = 'https://api.telegram.org/bot' . $config['telegram_token'] . '/sendMessage';
    $context = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query(['chat_id' => $config['telegram_chat_id'], 'text' => $text]),
            'timeout' => 10,
        ],
    ]);
    $response = @file_get_contents($url, false, $context);
    $sent = $response !== false && (json_decode($response, true)['ok'] ?? false);
}

if (!empty($config['mail_to'])) {
    $subject = '=?UTF-8?B?' . base64_encode('Новая заявка с сайта WEB.EKB') . '?=';
    $headers = "Content-Type: text/plain; charset=utf-8\r\n";
    if (!empty($config['mail_from'])) {
        $headers .= 'From: ' . $config['mail_from'] . "\r\n";
    }
    $sent = @mail($config['mail_to'], $subject, $text, $headers) || $sent;
}

http_response_code($sent ? 200 : 500);
echo json_encode(['ok' => $sent]);
