<?php
/**
 * @author HallTech AI
 */

namespace Domain\Services;

use Infrastructure\Database\Connection;
use PDO;

//TODO: Ajustar o nome pois controller e service no mesmo lugar esta gerando confusão. Talvez colocar o service em Domain/Services e o controller em App/Controllers mesmo, ou criar uma pasta específica para cada um. O importante é manter a organização clara para evitar confusões futuras.
class ModuleService
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Connection::make();
    }

    /**
     * Lista todos os módulos e suas funcionalidades agrupadas.
     * Agora pode receber o UUID do usuário para buscar personalizado.
     */
    public function list(?string $userUuid = null): array
    {
        if ($userUuid) {
            $stmt = $this->db->prepare("CALL sp_get_user_modules(:user_uuid)");
            $stmt->execute([':user_uuid' => $userUuid]);
        } else {
            $stmt = $this->db->query("SELECT * FROM vw_system_modules");
        }

        $rows = $stmt->fetchAll();
        return $this->formatModulesMap($rows);
    }

    /**
     * Ativa ou desativa um módulo ou funcionalidade para o usuário e retorna a lista atualizada.
     */
    public function toggleVisibility(string $userUuid, ?int $moduleId, ?int $functionalityId, bool $isActive): array
    {
        $sql = "CALL sp_toggle_user_module_functionality(:user_uuid, :module_id, :functionality_id, :is_active)";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':user_uuid'        => $userUuid,
            ':module_id'        => $moduleId,
            ':functionality_id' => $functionalityId,
            ':is_active'        => $isActive ? 1 : 0
        ]);
        
        // Pega o resultado do SELECT que está no final da procedure
        $rows = $stmt->fetchAll();
        
        // Workaround: Caso o PDO precise avançar o cursor (rowset) após os UPDATE/INSERT para chegar no SELECT
        if (empty($rows) && $stmt->nextRowset()) {
            $rows = $stmt->fetchAll();
        }

        // Se mesmo assim vier vazio, fechamos o cursor e forçamos uma nova requisição de listagem limpa
        if (empty($rows)) {
            $stmt->closeCursor();
            return $this->list($userUuid);
        }

        return $this->formatModulesMap($rows);
    }

    /**
     * Altera o modo de experiência (SIMPLE / ADVANCED) de uma funcionalidade e retorna a lista atualizada.
     */
    public function setFeatureMode(string $userUuid, int $functionalityId, string $mode): array
    {
        $stmt = $this->db->prepare("CALL sp_set_user_feature_mode(:user_uuid, :func_id, :mode)");
        $stmt->execute([
            ':user_uuid' => $userUuid,
            ':func_id'   => $functionalityId,
            ':mode'      => $mode
        ]);
        
        $rows = $stmt->fetchAll();
        if (empty($rows) && $stmt->nextRowset()) {
            $rows = $stmt->fetchAll();
        }

        if (empty($rows)) {
            $stmt->closeCursor();
            return $this->list($userUuid);
        }

        return $this->formatModulesMap($rows);
    }

    /**
     * Helper privado para formatar os dados que vêm do banco em uma estrutura JSON agrupada.
     */
    private function formatModulesMap(array $rows): array
    {
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
                    'route'       => $row['module_router_link'] ?? '',
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
                    'experienceMode'  => $row['feature_experience_mode'] ?? 'SIMPLE', 
                    'quickAccessIcon' => $row['feature_icon'],
                    'status'          => $row['feature_status'],
                    'route'           => $row['feature_route']
                ];
            }
        }

        return array_values($modulesMap);
    }
}