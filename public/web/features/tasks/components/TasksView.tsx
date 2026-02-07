import React from "react";
import Layout from "../../../components/Layout";
import { useTasks } from "../hooks/useTasks";
import { TaskType } from "../../../domain/tasks.types";

// Sub-components
import TaskTabs from "./TaskTabs";
import TaskFilters from "./TaskFilters";
import TaskConfigPanel from "./TaskConfigPanel";
import TaskItemDaily from "./list-items/TaskItemDaily";
import TaskItemGoal from "./list-items/TaskItemGoal";
import TaskItemShopping from "./list-items/TaskItemShopping";
import TaskItemNote from "./list-items/TaskItemNote";

/**
 * @author HallTech AI
 * View principal do módulo de Produtividade (Tarefas).
 * Responsável pela composição visual.
 */
const TasksView: React.FC = () => {
  const {
    filteredTasks,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
    config,
    updateConfig,
    toggleTask,
    loading
  } = useTasks();

  const renderContent = () => {
    if (loading) {
        return (
            <div className="text-center py-20 text-indigo-600">
                <i className="fas fa-spinner animate-spin text-3xl"></i>
            </div>
        );
    }

    if (filteredTasks.length === 0) {
      return (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <i className="fas fa-clipboard-list text-2xl"></i>
          </div>
          <p className="text-slate-400 font-bold text-sm">Nenhum item encontrado.</p>
        </div>
      );
    }

    return filteredTasks.map((task) => {
      if (activeTab === TaskType.DAILY) {
        return <TaskItemDaily key={task.id} task={task} onToggle={toggleTask} />;
      }
      if (activeTab === TaskType.GOAL) {
        return <TaskItemGoal key={task.id} task={task} onToggle={toggleTask} />;
      }
      if (activeTab === TaskType.SHOPPING) {
        return <TaskItemShopping key={task.id} task={task} onToggle={toggleTask} />;
      }
      if (activeTab === TaskType.NOTE) {
        return <TaskItemNote key={task.id} task={task} />;
      }
      return null;
    });
  };

  return (
    <Layout title="Produtividade">
      <div className="space-y-6">
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} config={config} />
        <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
        
        <div className="space-y-4">
            {renderContent()}
        </div>
      </div>
      
      <TaskConfigPanel config={config} onToggle={updateConfig} />
    </Layout>
  );
};

export default TasksView;