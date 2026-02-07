import { useState, useEffect, useMemo } from "react";
import { Task, TaskType } from "../../../domain/tasks.types";
import { tasksService } from "../services/tasks.service";

/**
 * @author HallTech AI
 * Configuração de visibilidade dos módulos de tarefas.
 */
interface TasksConfig {
  enableGoals: boolean;
  enableShopping: boolean;
  enableNotes: boolean;
}

/**
 * @author HallTech AI
 * Hook principal da feature de Tarefas.
 */
export const useTasks = () => {
  const [activeTab, setActiveTab] = useState<TaskType>(TaskType.DAILY);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Configuration State (Simulação de User Context/Auth Preferences)
  const [config, setConfig] = useState<TasksConfig>({
    enableGoals: true,
    enableShopping: true,
    enableNotes: true,
  });

  // Carregamento inicial
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await tasksService.getTasks();
        setTaskList(data);
      } catch (error) {
        console.error("Erro ao carregar tarefas", error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Lógica de Filtragem (Derivado)
  const filteredTasks = useMemo(() => {
    return taskList
      .filter((t) => {
        // 1. Filtro por Tipo (Tab)
        if (activeTab === TaskType.DAILY && t.type === TaskType.DAILY) return true;
        if (activeTab === TaskType.GOAL && (t.type === TaskType.GOAL || t.type === TaskType.DREAM)) return true;
        if (activeTab === TaskType.SHOPPING && t.type === TaskType.SHOPPING) return true;
        if (activeTab === TaskType.NOTE && t.type === TaskType.NOTE) return true;
        return false;
      })
      .filter((t) => {
        // 2. Filtro por Status
        if (filter === "all") return true;
        if (filter === "done") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
      });
  }, [taskList, activeTab, filter]);

  // Actions
  const toggleTask = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    // Em um app real, chamaria o service aqui também
  };

  const updateConfig = (key: keyof TasksConfig) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return {
    taskList, // Raw list se necessário
    filteredTasks,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
    config,
    updateConfig,
    toggleTask,
    loading
  };
};