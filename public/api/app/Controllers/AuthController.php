<?php
namespace App\Controllers;

use App\DTOs\RegisterPayload;
use Domain\Services\AuthService;
use Exception;

class AuthController
{
    private AuthService $service;

    public function __construct()
    {
        $this->service = new AuthService();
    }

    // Auxiliar para pegar o corpo da requisição
    private function getJsonBody(): array
    {
        $input = file_get_contents('php://input');
        return json_decode($input, true) ?? [];
    }

    public function register(): void
    {
        $body = $this->getJsonBody();
        $payload = RegisterPayload::fromRequest($body);

        // Validações Básicas
        $errors = [];
        if (empty($payload['email'])) $errors[] = "E-mail é obrigatório.";
        if (empty($payload['password'])) $errors[] = "Senha é obrigatória.";
        if ($payload['password'] !== $payload['confirmPassword']) $errors[] = "As senhas não conferem.";
        if (empty($payload['nickname'])) $errors[] = "Nickname é obrigatório.";

        if (!empty($errors)) {
            responseJson([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $errors
            ], 400);
            return;
        }

        try {
            $data = $this->service->register($payload);

            responseJson([
                'success' => true,
                'data' => $data,
                'message' => 'Usuário registrado com sucesso!'
            ], 201);

        } catch (Exception $e) {
            // Log do erro real no servidor e retorno amigável
            error_log("Erro no registro: " . $e->getMessage());
            error_log("Payload recebido: " . json_encode($body));
            error_log("Payload DTO: " . json_encode((array)$payload));


            error_log(print_r($body, true));

            $statusCode = ($e->getMessage() === "Este e-mail já está cadastrado.") ? 409 : 500;
            
            responseJson([
                'success' => false,
                'message' => $e->getMessage()
            ], $statusCode);
        }
    }
}