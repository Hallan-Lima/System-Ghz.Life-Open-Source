import React from "react";
import TasksView from "../features/tasks/components/TasksView";
import ModuleGuard from "../components/layout/ModuleGuard";

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
