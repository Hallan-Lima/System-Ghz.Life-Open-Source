<?php
/**
 * @author HallTech AI
 */

namespace App\DTOs;

class TaskPayload
{
    public static function fromRequest(array $data): array
    {
        return [
            'user_id' => $data['user_id'] ?? null, // Identificação do usuário
            'title' => $data['title'] ?? null,
            'type' => $data['type'] ?? null,
            'priority' => $data['priority'] ?? 'MEDIUM',
            'dueDate' => $data['dueDate'] ?? null,
            'content' => $data['content'] ?? null,
            'notes' => $data['notes'] ?? null,      // Notas adicionais
            'tags' => $data['tags'] ?? [],
            'targetValue' => $data['targetValue'] ?? null,
            'currentValue' => $data['currentValue'] ?? null,
            'progress' => $data['progress'] ?? 0,        // Progresso atual
            'completed' => $data['completed'] ?? false,  // Status de conclusão
            'estimatedCost' => $data['estimatedCost'] ?? null,
            'unit' => $data['unit'] ?? 'un',
            'recurrence' => $data['recurrence'] ?? null
        ];
    }
}