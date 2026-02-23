import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import { useTasks } from "../hooks/useTasks";
import { TaskType } from "../../../domain/tasks.types";

// Sub-components
import TaskTabs from "./TaskTabs";
import TaskFilters from "./TaskFilters";
import TaskItemDaily from "./list-items/TaskItemDaily";
import TaskItemGoal from "./list-items/TaskItemGoal";
import TaskItemShopping from "./list-items/TaskItemShopping";
import TaskItemNote from "./list-items/TaskItemNote";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @author HallTech AI
 * View principal do módulo de Produtividade (Tarefas).
 */
const TasksView: React.FC = () => {
  const {
    filteredTasks,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
    config,
    toggleTask,
    togglePin,
    updateProgressValue,
    deleteTask,
    editTask,
    loading,
    refresh
  } = useTasks();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [location.key]);

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
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-clipboard-list text-2xl text-slate-400"></i>
          </div>
          <h3 className="text-slate-800 dark:text-white font-bold mb-1">Nenhum registro encontrado</h3>
          <p className="text-slate-500 text-sm">Que tal criar algo novo hoje?</p>
        </div>
      );
    }

    return filteredTasks.map((task) => {
      const commonProps = {
        key: task.id,
        task,
        onToggle: () => toggleTask(task.id),
        onDelete: () => deleteTask(task.id),
        onEdit: () => editTask(task)
      };

      // CORREÇÃO: Agora renderiza baseado no TIPO DA TAREFA, e não na Aba Ativa
      if (task.type === TaskType.DAILY) {
        return <TaskItemDaily {...commonProps} />;
      }
      
      if (task.type === TaskType.GOAL || task.type === TaskType.DREAM) {
        return (
            <TaskItemGoal 
                {...commonProps} 
                onUpdateValue={updateProgressValue}
            />
        );
      }
      
      if (task.type === TaskType.SHOPPING) {
        return <TaskItemShopping {...commonProps} />;
      }
      
      if (task.type === TaskType.NOTE) {
        return (
          <TaskItemNote 
            key={task.id} 
            task={task} 
            onEdit={() => editTask(task)} 
            onDelete={() => deleteTask(task.id)}
            onArchive={() => toggleTask(task.id)}
            onPin={() => togglePin(task.id)}
          />
        );
      }
      return null;
    });
  };

  return (
    <Layout title="Produtividade">
      <div className="space-y-6">
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <TaskFilters 
            currentFilter={filter} 
            onFilterChange={setFilter} 
            activeTab={activeTab as TaskType}
        />
        
        <div className="space-y-4 pb-20">
            {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default TasksView;