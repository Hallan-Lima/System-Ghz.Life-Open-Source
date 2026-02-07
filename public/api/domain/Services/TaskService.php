<?php
/**
 * @author HallTech AI
 */

namespace Domain\Services;

class TaskService
{
    public function list(array $filters = []): array
    {
        return [];
    }

    public function create(array $payload): array
    {
        return array_merge($payload, [
            'id' => uniqid('task_', true),
            'isCompleted' => false,
            'isPinned' => false
        ]);
    }

    public function update(string $id, array $payload): array
    {
        return array_merge($payload, ['id' => $id]);
    }

    public function toggle(string $id): array
    {
        return ['id' => $id, 'isCompleted' => true];
    }

    public function updateProgress(string $id, float $value): array
    {
        return ['id' => $id, 'currentValue' => $value];
    }

    public function delete(string $id): void
    {
    }
}
