<?php
/**
 * @author HallTech AI
 * Router Frontal - Ponto de entrada único da API
 */

// 1. Carregamento do Bootstrap (Configurações, Banco, Funções Auxiliares)
require_once __DIR__ . '/../app/bootstrap.php';

// Importação dos Controllers (Adicione novos aqui conforme criar)
use App\Controllers\TaskController;
use App\Controllers\AuthController;
use App\Controllers\ModuleController;

// --- 2. Configuração de CORS (Cross-Origin Resource Sharing) ---
$allowedOrigins = [
    'https://ghzlife.halltech.site',
    'http://localhost:3000'
];

// 2. Pega a origem de quem está tentando acessar
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(403);
        exit;
    }
}4

// Permite requisições de qualquer origem. Em produção, você pode restringir ao seu domínio.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Se for uma requisição OPTIONS (pre-flight do navegador), respondemos OK e encerramos.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- 3. Definição de Rotas ---
// Estrutura: ['MÉTODO', 'REGEX_DA_URL', 'CLASSE_CONTROLLER', 'NOME_METODO']
$routes = [
    // Health Check (Função anônima para testes rápidos)
    ['GET', '#^/health$#', null, fn() => responseJson(['status' => 'ok', 'server_time' => date('c')])],

    // --- Módulo: Tasks ---
    ['GET',    '#^/api/tasks$#',                        TaskController::class, 'list'],
    ['POST',   '#^/api/tasks$#',                        TaskController::class, 'create'],
    ['PUT',    '#^/api/tasks/([a-zA-Z0-9-]+)$#',        TaskController::class, 'update'],
    ['DELETE', '#^/api/tasks/([a-zA-Z0-9-]+)$#',        TaskController::class, 'delete'],

    // rotas customizadas (Ações Específicas)
    ['PATCH',  '#^/api/tasks/([a-zA-Z0-9-]+)/toggle$#',   TaskController::class, 'toggle'],
    ['PATCH',  '#^/api/tasks/([a-zA-Z0-9-]+)/progress$#', TaskController::class, 'updateProgress'],
    ['PATCH',  '#^/api/tasks/([a-zA-Z0-9-]+)/pin$#',      TaskController::class, 'pin'],

    // --- Módulo: Auth ---
    ['POST', '#^/api/auth/register$#', AuthController::class, 'register'],
    ['POST', '#^/api/auth/login$#', AuthController::class, 'login'],
    
    // --- Módulo: Configuração / Sistema ---
    ['GET', '#^/api/modules$#', ModuleController::class, 'list'],
    ['POST', '#^/api/modules/toggle$#', ModuleController::class, 'toggleVisibility'],
    ['POST', '#^/api/modules/feature/mode$#', ModuleController::class, 'setFeatureMode']
];

// --- 4. Dispatcher (O Motor da API) ---
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri    = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);

foreach ($routes as [$method, $pattern, $controllerClass, $action]) {
    // 1. Verifica se o método HTTP bate (GET, POST, etc)
    if ($method !== $requestMethod) {
        continue;
    }

    // 2. Verifica se a URL bate com o padrão Regex
    if (preg_match($pattern, $requestUri, $matches)) {
        // Remove o primeiro item (match completo), mantendo apenas os parâmetros capturados (IDs)
        array_shift($matches);

        try {
            // Caso A: Rota com função anônima (como o /health)
            if ($controllerClass === null && is_callable($action)) {
                call_user_func_array($action, $matches);
                exit;
            }

            // Caso B: Rota para um Controller
            // Instancia o controller dinamicamente
            $controllerInstance = new $controllerClass();
            
            // Chama o método passando os parâmetros da URL (ex: o ID da task)
            call_user_func_array([$controllerInstance, $action], $matches);
            exit;

        } catch (Throwable $e) {
            // Captura erros fatais no código para não devolver página branca/erro HTML
            error_log("Erro na API: " . $e->getMessage());
            responseJson([
                'error' => true,
                'message' => 'Erro interno no processamento da requisição.',
                'debug' => $e->getMessage() // Remova em produção
            ], 500);
        }
    }
}

// --- 5. Rota Não Encontrada (404) ---
// Se o loop terminar sem encontrar rota, cai aqui.
responseJson(['message' => 'Rota não encontrada (404)'], 404);