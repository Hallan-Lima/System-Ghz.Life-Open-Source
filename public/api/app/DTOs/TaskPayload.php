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
            'title' => $data['title'] ?? null,
            'type' => $data['type'] ?? null,
            'priority' => $data['priority'] ?? 'MEDIUM',
            'dueDate' => $data['dueDate'] ?? null,
            'content' => $data['content'] ?? null,
            'tags' => $data['tags'] ?? [],
            'targetValue' => $data['targetValue'] ?? null,
            'currentValue' => $data['currentValue'] ?? null,
            'estimatedCost' => $data['estimatedCost'] ?? null,
            'unit' => $data['unit'] ?? 'un',
            'recurrence' => $data['recurrence'] ?? null
        ];
    }
}
