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
            $data = $this->service->list();

            responseJson([
                'success' => true,
                'data' => $data,
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
}