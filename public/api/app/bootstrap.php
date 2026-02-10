<?php
/**
 * @author HallTech AI
 */

require_once __DIR__ . '/../domain/Entities/Task.php';
require_once __DIR__ . '/../domain/Services/TaskService.php';
require_once __DIR__ . '/../app/DTOs/TaskPayload.php';
require_once __DIR__ . '/../app/Controllers/TaskController.php';
require_once __DIR__ . '/../infrastructure/Database/Connection.php';
require_once __DIR__ . '/../app/DTOs/RegisterPayload.php';
require_once __DIR__ . '/../app/DTOs/LoginPayload.php';
require_once __DIR__ . '/../domain/Services/AuthService.php';
require_once __DIR__ . '/../app/Controllers/AuthController.php';

function responseJson(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}
