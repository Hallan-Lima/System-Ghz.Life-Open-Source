<?php
namespace App\Controllers;

use App\DTOs\RegisterPayload;
use App\DTOs\LoginPayload;
use Domain\Services\AuthService;
use Exception;

class AuthController
{
    private AuthService $service;

    public function __construct()
    {
        $this->service = new AuthService();
    }

    protected function responseJson(array $data, int $statusCode = 200): void
    {
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
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

        #region Validações
        $errors = [];
        if (empty($payload['email'])) $errors[] = "E-mail é obrigatório.";
        if (empty($payload['password'])) $errors[] = "Senha é obrigatória.";
        if ($payload['password'] !== $payload['confirmPassword']) $errors[] = "As senhas não conferem.";
        if (empty($payload['nickname'])) $errors[] = "Nickname é obrigatório.";
        #endregion

        if (!empty($errors)) {
            responseJson([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $errors
            ], 400);
            return;
        }

        try {
            // Tenta registrar o usuário
            $data = $this->service->register($payload);

            if (isset($data['status']) && $data['status'] === true) {
                // Caso de Sucesso
                responseJson([
                    'success' => true,
                    'data'    => $data['data'] ?? null,
                    'message' => 'Usuário registrado com sucesso!'
                ], 201);
            } else {
                // Caso de Erro retornado pelo Service
                $rawMessage = $data['message'] ?? '';
                $statusCode = 400; // Padrão para erro de requisição

                // Validação baseada na string do SQL que você recebeu
                if (str_contains($rawMessage, 'uq_user_email_active')) {
                    $message = "Este e-mail já está em uso.";
                    $statusCode = 409; // Conflict
                } elseif (str_contains($rawMessage, 'nickname')) {
                    $message = "Este nickname já foi escolhido.";
                    $statusCode = 409;
                } elseif (str_contains($rawMessage, '1062')) {
                    $message = "Dados duplicados detectados.";
                    $statusCode = 409;
                } else {
                    $message = "Ocorreu algum erro, tente novamente mais tarde.";
                    $statusCode = 500;
                }

                responseJson([
                    'success' => false,
                    'message' => $message,
                ], $statusCode);
            }
        } catch (Exception $e) {
            error_log("Erro no registro: " . $e->getMessage());

            $message = "Ocorreu um erro interno no servidor.";
            $statusCode = 500;

            // 1. Tratamento específico para Duplicidade (E-mail ou Nickname)
            // O código 23000 é o padrão SQL para violação de integridade
            if ($e instanceof \PDOException && $e->getCode() === '23000') {
                $statusCode = 409; // Conflict

                // Verifica se o erro foi no e-mail baseado na sua Constraint
                if (str_contains($e->getMessage(), 'uq_user_email_active')) {
                    $message = "Este e-mail já está em uso.";
                } elseif (str_contains($e->getMessage(), 'nickname')) {
                    $message = "Este nickname já foi escolhido.";
                } else {
                    $message = "Ocorreu algum erro, tente novamente mais tarde.";
                }
            } else {
                // 2. Tratamento para outras exceções manuais que você possa ter lançado
                // Se a mensagem for amigável (curta), podemos usá-la
                if (strlen($e->getMessage()) < 100) {
                    $message = $e->getMessage();
                }
            }

            // Retorno amigável para o Frontend
            responseJson([
                'success' => false,
                'message' => $message
            ], $statusCode);
        }
    }

    public function login(): void {
        $body = $this->getJsonBody();
        
        // Se você não tiver a classe LoginPayload, use: $payload = $body;
        $payload = LoginPayload::fromRequest($body);

        #region Validações
        $errors = [];
        if (empty($payload['email'])) $errors[] = "E-mail é obrigatório.";
        if (empty($payload['password'])) $errors[] = "Senha é obrigatória.";
        #endregion

        if (!empty($errors)) {
            $this->responseJson([
                'success' => false,
                'message' => 'Erro de validação',
                'errors' => $errors
            ], 400);
            return;
        }

        try {
            // Aqui chamamos o serviço que fará toda a mágica
            $data = $this->service->login($payload);

            if (isset($data['status']) && $data['status'] === true) {
                // Retorno 200 ou 201
                $this->responseJson([
                    'success' => true,
                    'data'    => $data['data'], // O JSON formatado vem aqui
                    'message' => 'Login realizado!'
                ], 200);
            } else {
                $rawMessage = $data['message'] ?? 'Erro ao realizar login.';
                $this->responseJson([
                    'success' => false,
                    'message' => $rawMessage,
                ], 401); // 401 = Unauthorized
            }
        } catch (\Throwable $th) {
            error_log($th->getMessage());
            $this->responseJson([
                'success' => false,
                'message' => 'Erro interno no servidor.',
                'debug'   => $th->getMessage() // Remova em produção
            ], 500);
        }
    }
}