<?php
/**
 * @author HallTech AI
 */

namespace App\Controllers;

use Domain\Services\ModuleService;

class ModuleController
{
    private ModuleService $service;

    public function __construct()
    {
        $this->service = new ModuleService();
    }

    public function list(): void
    {
        try {
            // Se o frontend enviar o user_id na URL (ex: /api/modules?user_id=123), buscamos personalizado
            $userUuid = $_GET['user_id'] ?? null;
            $data = $this->service->list($userUuid);

            responseJson([
                'success' => true,
                'data'    => $data,
                'message' => 'Módulos carregados com sucesso.'
            ]);
        } catch (\Throwable $e) {
            error_log("Erro ao listar módulos: " . $e->getMessage());
            responseJson([
                'success' => false,
                'message' => 'Erro interno ao carregar módulos.'
            ], 500);
        }
    }

    /**
     * Endpoint para ativar/desativar módulos ou funcionalidades
     * Recebe um Payload JSON via POST/PUT
     */
    public function toggleVisibility(): void
    {
        try {
            // Captura o JSON enviado na requisição
            $input = json_decode(file_get_contents('php://input'), true);

            // Validação básica dos dados obrigatórios
            if (!$input || !isset($input['user_id']) || !isset($input['is_active'])) {
                responseJson([
                    'success' => false,
                    'message' => 'Parâmetros obrigatórios ausentes: user_id ou is_active.'
                ], 400);
            }

            $userUuid = $input['user_id'];
            $isActive = (bool) $input['is_active'];
            
            // Opcionais (um dos dois deve existir)
            $moduleId = isset($input['module_id']) ? (int) $input['module_id'] : null;
            $functionalityId = isset($input['functionality_id']) ? (int) $input['functionality_id'] : null;

            if (empty($moduleId) && empty($functionalityId)) {
                responseJson([
                    'success' => false,
                    'message' => 'É necessário informar o module_id ou o functionality_id.'
                ], 400);
            }

            // Chama o Service, executa a procedure e já recebe os dados 100% atualizados
            $data = $this->service->toggleVisibility($userUuid, $moduleId, $functionalityId, $isActive);

            responseJson([
                'success' => true,
                'data'    => $data, // Enviando os dados de volta para o frontend!
                'message' => 'Visibilidade atualizada com sucesso.'
            ]);

        } catch (\Throwable $e) {
            error_log("Erro ao atualizar visibilidade: " . $e->getMessage());
            responseJson([
                'success' => false,
                'message' => 'Erro interno ao atualizar a configuração do módulo/funcionalidade.'
            ], 500);
        }
    }
}