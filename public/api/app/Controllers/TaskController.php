<?php
/**
 * @author HallTech AI
 */

namespace App\Controllers;

use App\DTOs\TaskPayload;
use Domain\Services\TaskService;

class TaskController
{
    private TaskService $service;

    public function __construct()
    {
        $this->service = new TaskService();
    }

    private function getJsonBody(): array
    {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        return is_array($data) ? $data : [];
    }

    public function list(): void
    {
        $filters = [
            'user_id' => $_GET['user_id'] ?? null,
            'type' => $_GET['type'] ?? null,
            'status' => $_GET['status'] ?? null
        ];

        $data = $this->service->list($filters);

        responseJson([
            'success' => true,
            'data' => $data,
            'message' => 'Lista carregada com sucesso.',
            'errors' => []
        ]);
    }
    
    public function create(): void
    {
        $payload = TaskPayload::fromRequest($this->getJsonBody());

        // Segurança: O Frontend DEVE enviar o user_id e os campos básicos
        if (empty($payload['title']) || empty($payload['type']) || empty($payload['user_id'])) {
            responseJson([
                'success' => false,
                'data' => null,
                'message' => 'Falha na validação.',
                'errors' => ['Os campos user_id, title e type são obrigatórios.']
            ], 400);
        }

        $data = $this->service->create($payload);

        responseJson([
            'success' => true,
            'data' => $data,
            'message' => 'Task criada com sucesso.',
            'errors' => []
        ], 201);
    }

    public function update(string $id): void
    {
        $payload = TaskPayload::fromRequest($this->getJsonBody());

        if (empty($payload['title']) || empty($payload['type'])) {
            responseJson([
                'success' => false,
                'data' => null,
                'message' => 'Falha na validação.',
                'errors' => ['Os campos title e type são obrigatórios.']
            ], 400);
        }

        $data = $this->service->update($id, $payload);

        responseJson([
            'success' => true,
            'data' => $data,
            'message' => 'Task atualizada com sucesso.',
            'errors' => []
        ]);
    }

    public function toggle(string $id): void
    {
        $data = $this->service->toggle($id);

        responseJson([
            'success' => true,
            'data' => $data,
            'message' => 'Status atualizado.',
            'errors' => []
        ]);
    }

    public function updateProgress(string $id): void
    {
        $body = $this->getJsonBody();
        $value = $body['value'] ?? null;

        if ($value === null) {
            responseJson([
                'success' => false,
                'data' => null,
                'message' => 'Falha na validação.',
                'errors' => ['O campo value é obrigatório.']
            ], 400);
        }

        $data = $this->service->updateProgress($id, (float) $value);

        responseJson([
            'success' => true,
            'data' => $data,
            'message' => 'Progresso atualizado.',
            'errors' => []
        ]);
    }

    public function delete(string $id): void
    {
        $this->service->delete($id);

        responseJson([
            'success' => true,
            'data' => null,
            'message' => 'Task removida.',
            'errors' => []
        ]);
    }

    public function pin(string $id): void
    {
        $data = $this->service->togglePin($id);

        responseJson([
            'success' => true,
            'data' => $data,
            'message' => 'Pin atualizado com sucesso.',
            'errors' => []
        ]);
    }
}
