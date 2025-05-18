<?php

require_once __DIR__ . '/../Models/DbConnection.php';

use Projeto\Models\Database;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    registerUser($_POST);
} else {
    header('Location: www/Projeto/public/login');
    exit;
}

function registerUser($data)
{
    $db = new Database();

    // Validação básica (pode ser expandida)
    if (
        empty($data['Apelido']) ||
        empty($data['email']) ||
        empty($data['password']) ||
        empty($data['idade']) ||
        empty($data['terms'])
    ) {
        
        echo "<script>alert('Falha ao cadastrar o usuário, tente novamente.'); window.location.href = 'register-basic';</script>";
        exit;
    }

    // Hash da senha
    $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

    // Gênero: adapte conforme o valor enviado pelo select
    $gender = $data['language'] ?? null;

    // Exemplo de insert (ajuste os campos conforme sua tabela)
    $sql = "INSERT INTO user (nickname, password_hash, gender_id, birthdate)
            VALUES (?, ?, ?, ?)";

    $params = [
        $data['Apelido'],
        $passwordHash,
        1,
        $data['idade']
    ];

    try {
        var_dump($data);
        echo "<br>";
        var_dump($sql);

        $db->query($sql, $params);
        echo "<script> window.location.href = 'home';</script>";
        exit;
    } catch (\Exception $e) {
        echo "<script>alert('Erro: ".$e->getMessage()."'); window.location.href = 'register-basic';</script>";
        exit;
    }
}
