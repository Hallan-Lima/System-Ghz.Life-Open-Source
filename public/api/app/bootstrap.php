<?php
/**
 * @author HallTech AI
 * Router Frontal - Carregamento de Dependências
 */

// --- DTOs ---
require_once __DIR__ . '/../app/DTOs/TaskPayload.php';
require_once __DIR__ . '/../app/DTOs/RegisterPayload.php';
require_once __DIR__ . '/../app/DTOs/LoginPayload.php';

// --- DATABASE ---
require_once __DIR__ . '/../infrastructure/Database/Connection.php';

// --- ENTITIES ---
require_once __DIR__ . '/../domain/Entities/Task.php';

// --- SERVICES & CONTROLLERS (Módulos) ---

// Lista de arquivos vitais para carregar
$dependencies = [
    // Auth
    __DIR__ . '/../domain/Services/AuthService.php',
    __DIR__ . '/../app/Controllers/AuthController.php',
    
    // Tasks
    __DIR__ . '/../domain/Services/TaskService.php',
    __DIR__ . '/../app/Controllers/TaskController.php',
    
    // Modules
    __DIR__ . '/../domain/Services/ModuleService.php',
    __DIR__ . '/../app/Controllers/ModuleController.php'
];

foreach ($dependencies as $path) {
    if (!file_exists($path)) {
        header('Content-Type: application/json');
        echo json_encode([
            'error' => true, 
            'message' => "ERRO CRÍTICO: Arquivo não encontrado.",
            'path_error' => $path,
            'current_dir' => __DIR__
        ]);
        exit;
    }
    require_once $path;
}

// --- HELPER FUNCTIONS ---
function responseJson(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}