<?php
/**
 * @author HallTech AI
 */

namespace Domain\Services;

use Infrastructure\Database\Connection;
use PDO;

class TaskService
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Connection::make();
    }

    public function list(array $filters = []): array
    {
        $userId = $filters['user_id'] ?? null;
        if (!$userId) return [];

        $stmt = $this->db->prepare("SELECT * FROM vw_app_tasks_board WHERE user_id = :user_id");
        $stmt->execute(['user_id' => $userId]);
        $results = $stmt->fetchAll();

        $tasks = [];
        foreach ($results as $row) {
            $tasks[] = [
                'id' => (string) $row['id'],
                'type' => $row['type'],
                'title' => $row['title'],
                'priority' => $row['priority'],
                'priorityMode' => $row['priorityMode'] ?? 'manual',
                'priorityScore' => (int) ($row['priorityScore'] ?? 0),
                'necessity' => (int) ($row['necessity'] ?? 0),
                'satisfaction' => (int) ($row['satisfaction'] ?? 0),
                'frequency' => (int) ($row['frequency'] ?? 0),
                'completed' => (bool) $row['completed'],
                'isPinned' => (bool) $row['isPinned'],
                'dueDate' => $row['dueDate'],
                'targetValue' => $row['targetValue'] !== null ? (float)$row['targetValue'] : null,
                'currentValue' => $row['currentValue'] !== null ? (float)$row['currentValue'] : null,
                'progress' => (float) $row['progress'],
                'estimatedCost' => $row['estimatedCost'] !== null ? (float)$row['estimatedCost'] : null,
                'unit' => $row['unit'] ?? 'un',
                'recurrence' => $row['recurrence'],
                'content' => $row['content'],
                'notes' => $row['notes'],
                'tags' => $row['tags'] ? json_decode($row['tags'], true) : [],
                'createdAt' => $row['createdAt']
            ];
        }
        return $tasks;
    }

    public function create(array $payload): array
    {
        $stmt = $this->db->prepare("CALL sp_app_task_create(
            :user_id, :type, :title, :priority, 
            :priority_mode, :priority_score, :priority_necessity, :priority_satisfaction, :priority_frequency, 
            :content, :notes, :tags, :due_date, :recurrence, :target_value, :current_value, 
            :estimated_cost, :unit, :progress, :completed
        )");
        
        $tagsJson = !empty($payload['tags']) ? json_encode($payload['tags']) : null;
        
        $stmt->execute([
            'user_id' => $payload['user_id'] ?? null,
            'type' => $payload['type'] ?? 'DAILY',
            'title' => $payload['title'] ?? '',
            'priority' => $payload['priority'] ?? 'MEDIUM',
            'priority_mode' => $payload['priorityMode'] ?? 'manual',
            'priority_score' => $payload['priorityScore'] ?? 0,
            'priority_necessity' => $payload['necessity'] ?? 0,
            'priority_satisfaction' => $payload['satisfaction'] ?? 0,
            'priority_frequency' => $payload['frequency'] ?? 0,
            'content' => $payload['content'] ?? null,
            'notes' => $payload['notes'] ?? null,
            'tags' => $tagsJson,
            'due_date' => $payload['dueDate'] ?? null,
            'recurrence' => $payload['recurrence'] ?? null,
            'target_value' => $payload['targetValue'] ?? null,
            'current_value' => $payload['currentValue'] ?? null,
            'estimated_cost' => $payload['estimatedCost'] ?? null,
            'unit' => $payload['unit'] ?? 'un',
            'progress' => $payload['progress'] ?? 0,
            'completed' => ($payload['completed'] ?? false) ? 1 : 0
        ]);
        
        $result = $stmt->fetch();
        $payload['id'] = isset($result['new_id']) ? (string) $result['new_id'] : null;
        
        return $payload;
    }

    public function update(string $id, array $payload): array
    {
        $stmt = $this->db->prepare("CALL sp_app_task_update(
            :id, :title, :priority, 
            :priority_mode, :priority_score, :priority_necessity, :priority_satisfaction, :priority_frequency, 
            :content, :notes, :tags, :due_date, :recurrence, :target_value, :current_value, 
            :estimated_cost, :unit, :progress, :completed
        )");
        
        $tagsJson = !empty($payload['tags']) ? json_encode($payload['tags']) : null;
        
        $stmt->execute([
            'id' => $id,
            'title' => $payload['title'],
            'priority' => $payload['priority'],
            'priority_mode' => $payload['priorityMode'],
            'priority_score' => $payload['priorityScore'],
            'priority_necessity' => $payload['necessity'],
            'priority_satisfaction' => $payload['satisfaction'],
            'priority_frequency' => $payload['frequency'],
            'content' => $payload['content'],
            'notes' => $payload['notes'],
            'tags' => $tagsJson,
            'due_date' => $payload['dueDate'],
            'recurrence' => $payload['recurrence'],
            'target_value' => $payload['targetValue'],
            'current_value' => $payload['currentValue'],
            'estimated_cost' => $payload['estimatedCost'],
            'unit' => $payload['unit'],
            'progress' => $payload['progress'] ?? 0,
            'completed' => ($payload['completed'] ?? false) ? 1 : 0
        ]);
        
        $payload['id'] = $id;
        return $payload;
    }

    public function toggle(string $id): array
    {
        // Se status é 5 vira 1, se não é 5 vira 5. Altera progresso para 100% ou 0%
        $stmt = $this->db->prepare("UPDATE app_tasks SET sys_status_id = IF(sys_status_id = 5, 1, 5), progress = IF(sys_status_id = 5, 100, 0) WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return ['id' => $id];
    }

    public function updateProgress(string $id, float $value): array
    {
        $stmt = $this->db->prepare("
            UPDATE app_tasks 
            SET current_value = :val,
                progress = IF(target_value > 0, (:val / target_value) * 100, 100),
                sys_status_id = IF(:val >= IFNULL(target_value, 1), 5, 1)
            WHERE id = :id
        ");
        $stmt->execute(['val' => $value, 'id' => $id]);
        return ['id' => $id, 'currentValue' => $value];
    }

    public function togglePin(string $id): array
    {
        $stmt = $this->db->prepare("UPDATE app_tasks SET isPinned = NOT isPinned WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return ['id' => $id];
    }

    public function delete(string $id): void
    {
        $stmt = $this->db->prepare("DELETE FROM app_tasks WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}