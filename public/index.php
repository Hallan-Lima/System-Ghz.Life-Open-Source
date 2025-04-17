<?php

// filepath: p:\xampp\htdocs\www\Projeto\public\index.php

// Define o caminho base para os arquivos estáticos
define('BASE_URL', '../public/');

// Obtém o caminho da URL
$request = $_SERVER['REQUEST_URI'];

// Remove a barra inicial e a query string para evitar problemas de correspondência
$request = explode('?', ltrim($request, '/'))[0];

// Encontra a posição de '/Projeto/' na URL
$ProjetoPos = strpos($request, '/Projeto/');

// Remove a parte variável da URL, mantendo apenas o caminho após '/Projeto/'
$request = substr($request, $ProjetoPos+strlen('/Projeto/public/'));

$routers = [
    'home' => '../src/Views/pages/home.php',
    'login' => '../src/Views/pages/login.php',
    'account' => '../src/Views/pages/account.php',
    'overview' => '../src/Views/pages/overview.php',
    'forgot-password' => '../src/Views/pages/forgot-password.php',
    'register-basic' => '../src/Views/pages/register-basic.php',
];

if (array_key_exists($request, $routers)) {
    require_once '../src/Views/layouts/header.php';
    require $routers[$request];
    require_once '../src/Views/layouts/footer.php';
} else {
    require_once '../src/Views/layouts/header.php';
    require '../src/Views/pages/404.php';
    require_once '../src/Views/layouts/footer.php';
}



