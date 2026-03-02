import React from "react";
import TasksView from '@/modules/tasks/features/components/TasksView';
import ModuleGuard from '@/shared/ui/layout/ModuleGuard';

/**
 * @author HallTech AI
 * Página de Tarefas (Produtividade).
 * Ponto de entrada da rota.
 */
const TasksPage: React.FC = () => {
  return (
    <ModuleGuard routePath="/tasks">
      <TasksView />
    </ModuleGuard>
  );
};

export default TasksPage;
