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

    public function login(array $payload): array
    {
        // 1. Busca o usuário pelo E-mail para verificar senha
        // Nota: Ajuste os nomes das tabelas (user, user_email) conforme seu banco real
        $sqlUser = "
            SELECT 
                u.id as raw_id,
                LOWER(CONCAT(
                    HEX(SUBSTR(u.id, 1, 4)), '-', HEX(SUBSTR(u.id, 5, 2)), '-', 
                    HEX(SUBSTR(u.id, 7, 2)), '-', HEX(SUBSTR(u.id, 9, 2)), '-', 
                    HEX(SUBSTR(u.id, 11, 6))
                )) AS user_id,
                u.nickname,
                u.password_hash,
                ue.email,
                u.sys_gender_id,
                u.birthdate
            FROM user u
            JOIN user_email ue ON u.id = ue.user_id
            WHERE ue.email = :email
            AND u.deleted_at IS NULL
            LIMIT 1
        ";

        $stmt = $this->db->prepare($sqlUser);
        $stmt->bindValue(':email', $payload['email']);
        $stmt->execute();
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);

        // 2. Verifica se usuário existe e senha confere
        if (!$user || !password_verify($payload['password'], $user['password_hash'])) {
            return ['status' => false, 'message' => 'E-mail ou senha inválidos.'];
        }

        // 3. Busca Módulos e Funcionalidades (SQL Simples)
        // Traz tudo 'achatado' e o PHP organiza depois
        $sqlModules = "
            SELECT 
                sm.id AS module_id, sm.title AS mod_title, sm.icon AS mod_icon, 
                sm.color AS mod_color, sm.description AS mod_desc, sm.sys_status_id AS mod_status,
                smf.id AS feat_id, smf.title AS feat_title, smf.description AS feat_desc,
                smf.icon AS feat_icon, smf.router_link AS feat_route, smf.sys_status_id AS feat_status,
                CASE 
                    WHEN smf.sys_status_id = 1 THEN 1 
                    WHEN smfu.id IS NOT NULL THEN 1 
                    ELSE 0 
                END AS has_access
            FROM sys_module sm
            JOIN sys_module_functionality smf ON sm.id = smf.sys_module_id
            LEFT JOIN sys_module_functionality_user smfu 
                ON smfu.sys_module_functionality_id = smf.id 
                AND smfu.user_id = :uid
            WHERE sm.deleted_at IS NULL AND smf.deleted_at IS NULL
            ORDER BY sm.id ASC, smf.id ASC
        ";

        $stmtMod = $this->db->prepare($sqlModules);
        $stmtMod->bindValue(':uid', $user['raw_id']); // Usa o ID binário original
        $stmtMod->execute();
        $rows = $stmtMod->fetchAll(\PDO::FETCH_ASSOC);

        // 4. Processamento PHP: Montar a estrutura JSON
        $modulesConfig = [];
        $selectedModules = [];
        
        // Mapa para converter ID numérico do banco em ID string do Front
        $idMap = [1 => 'productivity', 2 => 'finance', 3 => 'health', 4 => 'ai_assistant', 5 => 'social'];

        foreach ($rows as $row) {
            $strId = $idMap[$row['module_id']] ?? 'custom_' . $row['module_id'];

            // Cria o módulo se não existir ainda no array
            if (!isset($modulesConfig[$strId])) {
                $isEnabled = ($row['mod_status'] == 1);
                if ($isEnabled) $selectedModules[] = $strId;

                $modulesConfig[$strId] = [
                    'id' => $strId,
                    'title' => $row['mod_title'],
                    'icon' => $row['mod_icon'],
                    'color' => $row['mod_color'],
                    'description' => $row['mod_desc'],
                    'isEnabled' => $isEnabled,
                    'features' => []
                ];
            }

            // Gera ID da feature baseado na rota (lógica do seu JSON)
            // TODO: Alterar para uma estrutura menos engessada
            $featId = strtolower(str_replace(' ', '_', $row['feat_title']));
            $route = $row['feat_route'] ?? ''; 
            if (strpos($route, 'DAILY') !== false) $featId = 'daily_tasks';
            elseif (strpos($route, 'GOAL') !== false) $featId = 'goals';
            elseif (strpos($route, 'DREAM') !== false) $featId = 'dreams';
            elseif (strpos($route, 'SHOPPING') !== false) $featId = 'shopping';
            elseif (strpos($route, 'NOTE') !== false) $featId = 'notes';

            // Adiciona a feature dentro do módulo
            $modulesConfig[$strId]['features'][] = [
                'id' => $featId,
                'label' => $row['feat_title'],
                'description' => $row['feat_desc'],
                'isEnabled' => (bool)$row['has_access'],
                'quickAccessIcon' => $row['feat_icon'],
                'route' => $row['feat_route']
            ];
        }

        // 5. Monta o objeto UserConfig
        $names = explode(' ', $user['nickname']);
        $userConfig = [
            'nickname' => $user['nickname'],
            'firstName' => $names[0],
            'lastName' => end($names),
            'email' => $user['email'],
            'password' => '', 
            'confirmPassword' => '',
            'gender' => ($user['sys_gender_id'] == 2 ? 'male' : ($user['sys_gender_id'] == 3 ? 'female' : 'other')),
            'birthDate' => $user['birthdate'],
            'selectedModules' => $selectedModules,
            // Dados estáticos (Mockados) para não quebrar o front
            'financeMode' => 'simple',
            'healthGoals' => [],
            'productivityConfig' => ['enableGoals' => true, 'enableShopping' => true, 'enableHabits' => false],
            'interests' => []
        ];

        return [
            'status' => true,
            'data' => [
                'userConfig' => $userConfig,
                'modulesConfig' => array_values($modulesConfig) // Remove chaves associativas
            ]
        ];
    }
}
