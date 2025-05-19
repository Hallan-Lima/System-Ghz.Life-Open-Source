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
        empty($data['nickname']) &&
        empty($data['email']) &&
        empty($data['password']) &&
        empty($data['gender_id']) &&
        empty($data['birthdate'])
    ) {
        echo "<script>alert('Falha ao cadastrar o usuário, tente novamente.'); window.location.href = 'register-basic';</script>";
        exit;
    }

    // Hash da senha
    $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

    // Ajuste os valores conforme o formulário e o esperado pela procedure
    $nickname = $data['nickname'];
    $gender_id = $data['gender_id']; // Ajuste conforme o valor real do formulário
    $birthdate = $data['birthdate'];
    $status_id = 1; // Exemplo: Ativo
    $level_id = 2;  // Exemplo: Usuário comum

    try {
        // Chama a procedure (último parâmetro é OUT para o id gerado)
        $sql = "CALL create_user_with_all_functionalities(?, ?, ?, ?, ?, ?, @new_user_id)";
        $params = [
            $nickname,
            $passwordHash,
            $gender_id,
            $birthdate,
            $status_id,
            $level_id
        ];

        $db->query($sql, $params);

        echo "<script>window.location.href = 'home';</script>";
        exit;
    } catch (\Exception $e) {
        echo "<script>alert('Erro: ".$e->getMessage()."'); window.location.href = 'register-basic';</script>";
        exit;
    }
}
