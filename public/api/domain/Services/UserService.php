<?php

namespace Domain\Services;

use Infrastructure\Database\Connection;
use PDO;
use Exception;

class UserService
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Connection::make();
    }

    public function updateProfile(array $payload): array
    {
        // Mapeamento de Gênero
        $genderId = null;
        if (!empty($payload['gender'])) {
            $genderMap = [
                'male' => 2,
                'masculino' => 2,
                'female' => 3,
                'feminino' => 3,
                'other' => 4,
                'outro' => 4
            ];
            $genderId = $genderMap[strtolower($payload['gender'])] ?? 1;
        }

        try {
            $userBin = hex2bin(str_replace('-', '', $payload['user_id']));
            
            // Build dinâmico de UPDATE para alterar apenas o que foi enviado
            $fieldsToUpdate = [];
            $params = [':user_id' => $userBin];

            if (isset($payload['nickname'])) {
                $fieldsToUpdate[] = "nickname = :nickname";
                $params[':nickname'] = $payload['nickname'];
            }
            if (isset($payload['firstName'])) {
                $fieldsToUpdate[] = "first_name = :first_name";
                $params[':first_name'] = $payload['firstName'];
            }
            if (isset($payload['lastName'])) {
                $fieldsToUpdate[] = "last_name = :last_name";
                $params[':last_name'] = $payload['lastName'];
            }
            if (isset($payload['birthDate'])) {
                $fieldsToUpdate[] = "birthdate = :birthdate";
                $params[':birthdate'] = $payload['birthDate'];
            }
            if ($genderId !== null) {
                $fieldsToUpdate[] = "sys_gender_id = :gender_id";
                $params[':gender_id'] = $genderId;
            }
            if (!empty($payload['password'])) {
                $fieldsToUpdate[] = "password_hash = :password_hash";
                $params[':password_hash'] = password_hash($payload['password'], PASSWORD_DEFAULT);
            }

            if (empty($fieldsToUpdate)) {
                return ['status' => false, 'message' => 'Nenhum dado para atualizar.'];
            }

            $sql = "UPDATE user SET " . implode(", ", $fieldsToUpdate) . " WHERE id = :user_id AND deleted_at IS NULL";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);

            return [
                'status' => true,
                'message' => 'Perfil atualizado com sucesso.'
            ];
        } catch (Exception $e) {
            error_log($e->getMessage());
            return [
                'status' => false,
                'message' => 'Erro interno na atualização: ' . $e->getMessage()
            ];
        }
    }
}
