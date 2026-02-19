<?php
/**
 * @author HallTech AI
 */

namespace Domain\Services;

use Infrastructure\Database\Connection;
use PDO;

class ModuleService
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Connection::make();
    }

    /**
     * Lista todos os módulos e suas funcionalidades agrupadas.
     * Consome a View: vw_system_modules
     */
    public function list(): array
    {
        $stmt = $this->db->query("SELECT * FROM vw_system_modules");
        $rows = $stmt->fetchAll();

        $modulesMap = [];

        foreach ($rows as $row) {
            $moduleId = $row['module_id'];

            if (!isset($modulesMap[$moduleId])) {
                $modulesMap[$moduleId] = [
                    'id'          => (string) $moduleId,
                    'title'       => $row['module_title'],
                    'icon'        => $row['module_icon'],
                    'color'       => $row['module_color'],
                    'description' => $row['module_desc'],
                    'isEnabled'   => (bool) $row['module_enabled'],
                    'status'      => $row['module_status'],
                    'features'    => []
                ];
            }

            if (!empty($row['feature_id'])) {
                $modulesMap[$moduleId]['features'][] = [
                    'id'              => (string) $row['feature_id'],
                    'label'           => $row['feature_label'],
                    'description'     => $row['feature_desc'],
                    'isEnabled'       => (bool) $row['feature_enabled'],
                    'quickAccessIcon' => $row['feature_icon'],
                    'status'          => $row['feature_status'],
                    'route'           => $row['feature_route']
                ];
            }
        }

        return array_values($modulesMap);
    }
}