<?php
namespace Domain\Services;

use Error;
use Infrastructure\Database\Connection;
use PDO;
use Exception;

class AuthService
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Connection::make();
    }

    public function register(array $payload): array
    {
        // 1. Mapeamento de Gênero
        $genderMap = [
            'male' => 2,
            'masculino' => 2,
            'female' => 3,
            'feminino' => 3,
            'other' => 4,
            'outro' => 4
        ];
        $genderId = $genderMap[strtolower($payload['gender'] ?? '')] ?? 1;

        // 2. Hash da Senha
        $passwordHash = password_hash($payload['password'], PASSWORD_DEFAULT);

        // 3. Preparar funcionalidades
        // O array_map garante que os IDs sejam inteiros
        $functionalitiesArray = array_map('intval', $payload['selectedModules'] ?? []);
        $jsonFunctionalities = json_encode($functionalitiesArray);

        try {
            // Prepara a chamada da Procedure
            $stmt = $this->db->prepare("
                CALL sp_register_complete_user(
                    :nickname, 
                    :password, 
                    :gender, 
                    :birthDate, 
                    :email, 
                    :functionalities, 
                    @uuid, 
                    @token
                )
            ");

            // Execução com os parâmetros mapeados
            $stmt->execute([
                ':nickname'        => $payload['nickname'],
                ':password'        => $passwordHash,
                ':gender'          => $genderId,
                ':birthDate'       => $payload['birthDate'],
                ':email'           => $payload['email'],
                ':functionalities' => $jsonFunctionalities // Agora enviamos a string JSON
            ]);

            // Limpa o cursor para permitir a próxima query de leitura dos OUT params
            $stmt->closeCursor();

            // Recupera os valores de saída
            $result = $this->db->query("SELECT @uuid AS uuid, @token AS token")->fetch(PDO::FETCH_ASSOC);

            return [
                'status' => true,
                'data'   => $result
            ];
        } catch (Exception $e) {
            error_log($e->getMessage());
            return [
                'status' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}