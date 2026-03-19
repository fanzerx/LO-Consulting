<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'config.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Acesso inválido.");
}

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$cargo = $_POST['cargo'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';

if (!isset($_FILES['curriculo']) || $_FILES['curriculo']['error'] !== 0) {
    header("Location: /landingpage/trabalhe-conosco.html?status=erro");
    exit;
}

$arquivoTmp = $_FILES['curriculo']['tmp_name'];
$arquivoNome = $_FILES['curriculo']['name'];

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = EMAIL_USER;
    $mail->Password = EMAIL_PASS;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom(EMAIL_USER, 'Site LO Consulting');
    $mail->addAddress(EMAIL_USER);

    $mail->addAttachment($arquivoTmp, $arquivoNome);

    $mail->isHTML(true);
    $mail->Subject = "Novo currículo recebido";
    $mail->Body = "
        <h2>Novo currículo recebido</h2>
        <b>Nome:</b> $nome <br>
        <b>Email:</b> $email <br>
        <b>Telefone:</b> $telefone <br>
        <b>Cargo:</b> $cargo <br>
        <b>Mensagem:</b> $mensagem
    ";

    $mail->send();

    header("Location: /landingpage/trabalhe-conosco.html?status=sucesso");
    exit;

} catch (Exception $e) {
    header("Location: /landingpage/trabalhe-conosco.html?status=erro");
    exit;
}