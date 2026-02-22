import React from "react";
import TaskCreatorView from "../features/tasks/components/TaskCreatorView";
import ModuleGuard from "../components/layout/ModuleGuard";

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
