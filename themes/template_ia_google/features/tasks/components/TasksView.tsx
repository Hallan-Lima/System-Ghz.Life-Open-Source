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

  // Recarrega a lista se voltar da tela de criação/edição
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
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <i className="fas fa-clipboard-list text-2xl"></i>
          </div>
          <p className="text-slate-400 font-bold text-sm">Nenhum item encontrado.</p>
          <button 
            onClick={() => navigate('/tasks/new', { state: { defaultType: activeTab } })}
            className="mt-4 text-indigo-500 font-bold text-xs uppercase tracking-widest hover:underline"
          >
            Criar novo item
          </button>
        </div>
      );
    }

    return filteredTasks.map((task) => {
      const commonProps = {
        key: task.id,
        task,
        onToggle: toggleTask,
        onDelete: deleteTask,
        onEdit: editTask
      };

      if (activeTab === TaskType.DAILY) {
        return <TaskItemDaily {...commonProps} />;
      }
      
      // Goals e Dreams usam o mesmo componente visual, mas são filtrados separadamente
      if (activeTab === TaskType.GOAL || activeTab === TaskType.DREAM) {
        return (
            <TaskItemGoal 
                {...commonProps} 
                onUpdateValue={updateProgressValue}
            />
        );
      }
      
      if (activeTab === TaskType.SHOPPING) {
        return <TaskItemShopping {...commonProps} />;
      }
      
      if (activeTab === TaskType.NOTE) {
        return (
          <TaskItemNote 
            key={task.id} 
            task={task} 
            onEdit={() => editTask(task)} 
            onDelete={() => deleteTask(task.id)}
            onArchive={() => toggleTask(task.id)} // Arquivar usa a lógica de toggle completion
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
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} config={config} />
        
        <TaskFilters 
            currentFilter={filter} 
            onFilterChange={setFilter} 
            activeTab={activeTab} // Passado para alterar o label de Concluído para Arquivado
        />
        
        <div className="space-y-4 pb-20">
            {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default TasksView;
