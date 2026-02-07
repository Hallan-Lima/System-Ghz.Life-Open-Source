import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Task, TaskType } from "../../../domain/tasks.types";
import { tasksService } from "../services/tasks.service";
import { useModules } from "../../modules/hooks/useModules";

/**
 * @author HallTech AI
 * Configuração de visibilidade dos módulos de tarefas.
 */
interface TasksConfig {
  enableDaily: boolean;
  enableGoals: boolean;
  enableDreams: boolean;
  enableShopping: boolean;
  enableNotes: boolean;
}

/**
 * @author HallTech AI
 * Hook principal da feature de Tarefas.
 * Gerencia Listagem, Filtragem e Ações CRUD.
 * Agora sincronizado com o ModuleService.
 */
export const useTasks = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { modules, loading: loadingModules } = useModules();

  // Inicializa a aba ativa baseada na URL ou padrão DAILY
  const initialTab = (searchParams.get("type") as TaskType) || TaskType.DAILY;
  const [activeTab, setActiveTabState] = useState<TaskType>(initialTab);

  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Deriva a configuração a partir dos módulos globais
  const config: TasksConfig = useMemo(() => {
    const prodModule = modules.find(m => m.id === 'productivity');
    const features = prodModule?.features || [];

    return {
        enableDaily: features.find(f => f.id === 'daily_tasks')?.isEnabled ?? true,
        enableGoals: features.find(f => f.id === 'goals')?.isEnabled ?? true,
        enableDreams: features.find(f => f.id === 'dreams')?.isEnabled ?? true,
        enableShopping: features.find(f => f.id === 'shopping')?.isEnabled ?? true,
        enableNotes: features.find(f => f.id === 'notes')?.isEnabled ?? true,
    };
  }, [modules]);

  // Wrapper para atualizar o estado e a URL ao mesmo tempo
  const setActiveTab = (tab: TaskType) => {
    setActiveTabState(tab);
    setSearchParams({ type: tab });
  };

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await tasksService.getTasks();
      setTaskList(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Sincroniza estado interno se a URL mudar externamente (ex: botão voltar do browser)
  useEffect(() => {
    const typeFromUrl = searchParams.get("type") as TaskType;
    if (typeFromUrl && Object.values(TaskType).includes(typeFromUrl)) {
      setActiveTabState(typeFromUrl);
    }
  }, [searchParams]);

  // Validação: Se a aba ativa for desativada nos módulos, redireciona para uma aba válida
  useEffect(() => {
      if (!loadingModules) {
          // Lógica de fallback hierárquico
          if (activeTab === TaskType.DAILY && !config.enableDaily) {
             if (config.enableGoals) setActiveTab(TaskType.GOAL);
             else if (config.enableDreams) setActiveTab(TaskType.DREAM);
             else if (config.enableShopping) setActiveTab(TaskType.SHOPPING);
             else if (config.enableNotes) setActiveTab(TaskType.NOTE);
          }
          else if (activeTab === TaskType.GOAL && !config.enableGoals) setActiveTab(TaskType.DAILY);
          else if (activeTab === TaskType.DREAM && !config.enableDreams) setActiveTab(TaskType.DAILY);
          else if (activeTab === TaskType.SHOPPING && !config.enableShopping) setActiveTab(TaskType.DAILY);
          else if (activeTab === TaskType.NOTE && !config.enableNotes) setActiveTab(TaskType.DAILY);
      }
  }, [config, activeTab, loadingModules]);

  const filteredTasks = useMemo(() => {
    const list = taskList
      .filter((t) => {
        if (activeTab === TaskType.DAILY && t.type === TaskType.DAILY) return true;
        if (activeTab === TaskType.GOAL && t.type === TaskType.GOAL) return true;
        if (activeTab === TaskType.DREAM && t.type === TaskType.DREAM) return true;
        if (activeTab === TaskType.SHOPPING && t.type === TaskType.SHOPPING) return true;
        if (activeTab === TaskType.NOTE && t.type === TaskType.NOTE) return true;
        return false;
      })
      .filter((t) => {
        if (filter === "all") return true;
        if (filter === "done") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
      });

    // Ordenação: Itens fixados (isPinned) aparecem primeiro
    return list.sort((a, b) => {
      // Se um está fixado e o outro não, o fixado vem primeiro
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0; // Mantém a ordem original (geralmente por data de criação)
    });
  }, [taskList, activeTab, filter]);

  // --- ACTIONS ---

  const toggleTask = async (id: string) => {
    const task = taskList.find(t => t.id === id);
    if (!task) return;

    const newStatus = !task.completed;

    // 1. Atualização Otimista
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updates: Partial<Task> = { completed: newStatus };
          // Lógica otimista para metas
          if ((t.type === TaskType.GOAL || t.type === TaskType.DREAM) && newStatus) {
            updates.progress = 100;
            if (t.targetValue) updates.currentValue = t.targetValue;
          }
          return { ...t, ...updates };
        }
        return t;
      })
    );
    
    // 2. Chamada ao Serviço
    try {
      await tasksService.toggleTaskCompletion(id);
    } catch (error) {
      console.error("Erro ao atualizar status", error);
      loadTasks(); // Reverte em caso de erro
    }
  };

  const togglePin = async (id: string) => {
    // 1. Atualização Otimista
    setTaskList((prev) =>
      prev.map((t) => t.id === id ? { ...t, isPinned: !t.isPinned } : t)
    );

    // 2. Chamada ao Serviço
    try {
      await tasksService.toggleTaskPin(id);
    } catch (error) {
      console.error("Erro ao fixar tarefa", error);
      loadTasks();
    }
  };

  /**
   * Atualiza o valor numérico de uma meta/sonho.
   */
  const updateProgressValue = async (id: string, newValue: number) => {
    // 1. Otimista
    setTaskList((prev) =>
        prev.map((t) => {
            if (t.id === id) {
                const target = t.targetValue || 1;
                const newProgress = Math.round((newValue / target) * 100);
                return { ...t, currentValue: newValue, progress: newProgress, completed: newValue >= target };
            }
            return t;
        })
    );

    // 2. Serviço
    try {
        await tasksService.updateTaskValue(id, newValue);
    } catch (error) {
        console.error("Erro ao atualizar valor", error);
        loadTasks(); // Rollback
    }
  };

  /**
   * Remove a tarefa imediatamente da lista e dispara evento para o serviço.
   * Fluxo: UI Update -> API Call. Não altera status, remove o dado.
   */
  const deleteTask = async (id: string) => {
    // 1. Atualização Otimista: Remove da UI imediatamente (Hard Delete)
    const previousList = [...taskList];
    setTaskList((prev) => prev.filter((t) => t.id !== id));

    // 2. Chamada ao Serviço (Dispara evento ao BFF/Mock)
    try {
      await tasksService.deleteTask(id);
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
      // Em caso de erro, reverte a lista
      setTaskList(previousList); 
    }
  };

  const editTask = (task: Task) => {
    navigate("/tasks/new", { state: { taskToEdit: task } });
  };

  return {
    taskList, 
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
    refresh: loadTasks
  };
};
