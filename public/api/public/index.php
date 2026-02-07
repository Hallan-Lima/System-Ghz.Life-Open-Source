<?php
/**
 * @author HallTech AI
 */

require_once __DIR__ . '/../app/bootstrap.php';

use App\Controllers\TaskController;

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

$controller = new TaskController();

if ($path === '/health' && $method === 'GET') {
    responseJson([
        'success' => true,
        'data' => ['status' => 'ok'],
        'message' => '',
        'errors' => []
    ]);
}

if (preg_match('#^/api/tasks$#', $path)) {
    if ($method === 'GET') {
        $controller->list();
    }
    if ($method === 'POST') {
        $controller->create();
    }
}

if (preg_match('#^/api/tasks/([a-zA-Z0-9-]+)$#', $path, $matches)) {
    $id = $matches[1];
    if ($method === 'PUT') {
        $controller->update($id);
    }
    if ($method === 'DELETE') {
        $controller->delete($id);
    }
}

if (preg_match('#^/api/tasks/([a-zA-Z0-9-]+)/toggle$#', $path, $matches) && $method === 'PATCH') {
    $controller->toggle($matches[1]);
}

if (preg_match('#^/api/tasks/([a-zA-Z0-9-]+)/progress$#', $path, $matches) && $method === 'PATCH') {
    $controller->updateProgress($matches[1]);
}

responseJson([
    'success' => false,
    'data' => null,
    'message' => 'Rota não encontrada.',
    'errors' => []
], 404);
