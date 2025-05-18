<?php

require_once __DIR__ . '/../Models/DbConnection.php';
use Projeto\Models\Database;

$db = new Database();

function getMenuAccess($userId) {
    global $db;

    // Busca todas as funcionalidades que o usuário pode ler
    $sql = "
        SELECT 
            f.id, f.name, f.url, f.parent_id, f.description, f.order_index, m.name as module_name
        FROM user_functionality uf
        JOIN functionality f ON uf.functionality_id = f.id
        JOIN module m ON f.module_id = m.id
        WHERE uf.user_id = ? AND uf.can_read = 1
        ORDER BY m.name, f.parent_id, f.order_index, f.name
    ";
    $rows = $db->fetchAll($sql, [$userId]);

    // Organiza por módulos e hierarquia de menus
    $modules = [];
    $menus = [];
    foreach ($rows as $row) {
        if ($row['parent_id'] === null) {
            // Menu principal
            $menus[$row['id']] = [
                'type' => 'item',
                'text' => $row['name'],
                'href' => $row['url'] ?? '#',
                'icon' => 'bx bx-collection', // Ajuste conforme desejar
                'subItems' => [],
                'order' => $row['order_index'],
                'module' => $row['module_name']
            ];
        }
    }
    // Submenus
    foreach ($rows as $row) {
        if ($row['parent_id'] !== null && isset($menus[$row['parent_id']])) {
            $menus[$row['parent_id']]['subItems'][] = [
                'href' => $row['url'] ?? '#',
                'text' => $row['name']
            ];
        }
    }

    // Agrupa por módulos, adicionando headers
    $menuData = [];
    $lastModule = '';
    foreach ($menus as $menu) {
        if ($menu['module'] !== $lastModule) {
            $menuData[] = [
                'type' => 'header',
                'text' => $menu['module']
            ];
            $lastModule = $menu['module'];
        }
        unset($menu['module'], $menu['order']);
        $menuData[] = $menu;
    }

    return $menuData;
}