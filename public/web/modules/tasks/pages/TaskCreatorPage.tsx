import React from "react";
import TaskCreatorView from '@/modules/tasks/features/components/TaskCreatorView';
import ModuleGuard from '@/shared/ui/layout/ModuleGuard';

/**
 * @author HallTech AI
 * Página de Criação de Tarefas.
 * Serve como rota para o formulário de adição.
 */
const TaskCreatorPage: React.FC = () => {
  return (
    <ModuleGuard routePath="/tasks">
      <TaskCreatorView />
    </ModuleGuard>
  );
};

export default TaskCreatorPage;
