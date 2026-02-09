<?php
namespace Domain\Services;

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
        // 1. Mapeamento de Gênero (Frontend String -> Banco ID)
        // Baseado no seu create_db.sql: 1=Não Info, 2=Masc, 3=Fem, 4=Outro
        $genderMap = [
            'male' => 2, 'masculino' => 2,
            'female' => 3, 'feminino' => 3,
            'other' => 4, 'outro' => 4
        ];
        $genderId = $genderMap[strtolower($payload['gender'])] ?? 1;

        // 2. Hash da Senha
        $passwordHash = password_hash($payload['password'], PASSWORD_DEFAULT);

        // 3. Preparar JSON de funcionalidades
        // Se o frontend mandar strings, garantimos que sejam inteiros para o JSON do MySQL
        $functionalities = array_map('intval', $payload['selectedModules']);
        $jsonFunc = json_encode($functionalities);

        try {
            // Prepara a chamada da Procedure
            $stmt = $this->db->prepare("
                CALL sp_register_complete_user(
                    :nickname, 
                    :password, 
                    :gender, 
                    :birthDate, 
                    :email, 
                    :jsonFunc, 
                    @uuid, 
                    @token
                )
            ");

            // Executa
            $stmt->execute([
                ':nickname' => $payload['nickname'],
                ':password' => $passwordHash,
                ':gender' => $genderId,
                ':birthDate' => $payload['birthDate'],
                ':email' => $payload['email'],
                ':jsonFunc' => $jsonFunc
            ]);
            
            // Fecha o cursor anterior para poder rodar o SELECT das variáveis de saída
            $stmt->closeCursor();

            // Recupera os valores de saída (@uuid e @token)
            $result = $this->db->query("SELECT @uuid AS uuid, @token AS token")->fetch(PDO::FETCH_ASSOC);

            if (!$result || empty($result['uuid'])) {
                throw new Exception("Erro ao registrar usuário: Retorno vazio do banco.");
            }

            return [
                'user' => [
                    'id' => $result['uuid'],
                    'name' => $payload['nickname'],
                    'email' => $payload['email']
                ],
                'token' => $result['token']
            ];

        } catch (\PDOException $e) {
            // Tratamento básico de erro de duplicidade (SQLState 23000)
            if ($e->getCode() == '23000') {
                throw new Exception("Este e-mail já está cadastrado.");
            }
            throw $e;
        }
    }
}