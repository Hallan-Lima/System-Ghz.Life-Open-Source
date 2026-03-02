<?php

namespace App\Controllers;

use Domain\Services\UserService;

class UserController
{
    private UserService $userService;

    public function __construct()
    {
        $this->userService = new UserService();
    }

    /**
     * Atualiza as informações de perfil do usuário.
     * Método: PUT /api/users/profile
     */
    public function updateProfile()
    {
        // Pega o corpo da requisição (JSON)
        $inputJSON = file_get_contents('php://input');
        $payload = json_decode($inputJSON, true);

        if (!$payload) {
            responseJson(['status' => false, 'message' => 'Nenhum dado recebido.'], 400);
        }

        // Validação básica (user_id é obrigatório para ditar quem está sendo atualizado)
        // Idealmente seria extraído via Header (JWT ou Session), mas vamos usar o id enviado
        if (empty($payload['user_id'])) {
            responseJson(['status' => false, 'message' => 'O ID de usuário (user_id) é obrigatório.'], 400);
        }

        $result = $this->userService->updateProfile($payload);

        if ($result['status']) {
            responseJson($result, 200);
        } else {
            responseJson($result, 400);
        }
    }
}
