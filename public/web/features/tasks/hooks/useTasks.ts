import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Task, TaskType } from "../../../domain/tasks.types";
import { tasksService } from "../services/tasks.service";
import { useModules } from "../../modules/hooks/useModules";

/**
 * @author HallTech AI
 * Configuração de visibilidade dos módulos de tarefas.
 */
export type TaskFilterType = TaskType | "ALL";
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

  // Inicializa a aba ativa baseada na URL ou padrão ALL (Tudo)
  const initialTab = (searchParams.get("type") as TaskFilterType) || "ALL";
  const [activeTab, setActiveTabState] = useState<TaskFilterType>(initialTab);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("pending");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Deriva a configuração a partir dos módulos globais
  const config: TasksConfig = useMemo(() => {
    const prodModule = modules.find((m) => m.id === "productivity");
    const features = prodModule?.features || [];

    return {
      enableDaily:
        features.find((f) => f.id === "daily_tasks")?.isEnabled ?? true,
      enableGoals: features.find((f) => f.id === "goals")?.isEnabled ?? true,
      enableDreams: features.find((f) => f.id === "dreams")?.isEnabled ?? true,
      enableShopping:
        features.find((f) => f.id === "shopping")?.isEnabled ?? true,
      enableNotes: features.find((f) => f.id === "notes")?.isEnabled ?? true,
    };
  }, [modules]);

  // Wrapper para atualizar o estado e a URL ao mesmo tempo
  const setActiveTab = useCallback(
    (tab: TaskFilterType) => {
      setActiveTabState(tab);
      setFilter("pending");
      setSelectedTag(null);

      if (tab === "ALL") {
        searchParams.delete("type");
      } else {
        searchParams.set("type", tab);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const formatTag = (tag: string) => {
    if (!tag) return "";
    return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  };

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    
    taskList.forEach((t) => {
      // 1. Verifica o filtro de Aba (Tab)
      let isModuleActive = false;
      if (activeTab === "ALL") {
        isModuleActive = true; 
      } else {
        isModuleActive = t.type === activeTab;
      }

      if (!isModuleActive) return;

      // 2. Verifica o filtro de Status
      let matchesStatus = true;
      if (filter === "done") matchesStatus = t.completed;
      if (filter === "pending") matchesStatus = !t.completed;
      
      if (!matchesStatus) return;

      // 3. Formata e adiciona a tag
      if (t.tags && t.tags.length > 0) {
        t.tags.forEach((tag) => tags.add(formatTag(tag)));
      }
    });

    return Array.from(tags).sort();
  }, [taskList, activeTab, filter]);

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
      } else if (activeTab === TaskType.GOAL && !config.enableGoals)
        setActiveTab(TaskType.DAILY);
      else if (activeTab === TaskType.DREAM && !config.enableDreams)
        setActiveTab(TaskType.DAILY);
      else if (activeTab === TaskType.SHOPPING && !config.enableShopping)
        setActiveTab(TaskType.DAILY);
      else if (activeTab === TaskType.NOTE && !config.enableNotes)
        setActiveTab(TaskType.DAILY);
    }
  }, [config, activeTab, loadingModules]);

  const filteredTasks = useMemo(() => {
    const list = taskList
      .filter((t) => {
        // NOVA LÓGICA: Se a aba for "Tudo", verifica se o módulo daquela tarefa está ativo
        if (activeTab === "ALL") {
          if (t.type === TaskType.DAILY) return config.enableDaily;
          if (t.type === TaskType.GOAL) return config.enableGoals;
          if (t.type === TaskType.DREAM) return config.enableDreams;
          if (t.type === TaskType.SHOPPING) return config.enableShopping;
          if (t.type === TaskType.NOTE) return config.enableNotes;
          return false;
        }
        return t.type === activeTab;
      })
      .filter((t) => {
        if (filter === "all") return true;
        if (filter === "done") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
      })
      .filter((t) => {
        if (selectedTag) {
          return t.tags && t.tags.some(
            (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
          );
        }
        return true;
      });

    // Ordenação (Cascata de 5 Regras)
    return list.sort((a, b) => {
      // REGRA 1: Itens fixados (Pinned) vêm primeiro, ignorando todas as outras regras
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // REGRA 2: Grupo de Prioridade (Todas as HIGH juntas, depois MEDIUM, depois LOW)
      const priorityWeight: Record<string, number> = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      };
      const pA = priorityWeight[a.priority as string] || 2; // Padrão: 2 (Medium)
      const pB = priorityWeight[b.priority as string] || 2;

      if (pA !== pB) return pB - pA; // Maior peso de grupo vem antes

      // REGRA 3: Score de Prioridade (Calculado internamente no grupo - Maior pro menor)
      const getScore = (task: typeof a) => {
        if (task.priorityScore !== undefined && task.priorityScore !== null) {
          return task.priorityScore;
        }
        // Fallback caso a tarefa seja antiga e não tenha score salvo no banco
        if (task.priority === "HIGH") return 100;
        if (task.priority === "LOW") return 10;
        return 50;
      };

      const scoreA = getScore(a);
      const scoreB = getScore(b);

      if (scoreA !== scoreB) return scoreB - scoreA; // Desempata pelo Score

      // REGRA 4: Data de Vencimento (dueDate) - Vencem primeiro ficam no topo
      if (a.dueDate && b.dueDate) {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        if (dateA !== dateB) return dateA - dateB; // Desempata pela data
      } else if (a.dueDate && !b.dueDate) {
        return -1; // Tarefa com prazo vence a que não tem prazo
      } else if (!a.dueDate && b.dueDate) {
        return 1;
      }

      // REGRA 5: Ordem Alfabética (Critério final se data e score forem idênticos)
      const titleA = a.title || "";
      const titleB = b.title || "";
      return titleA.localeCompare(titleB);
    });
  }, [taskList, activeTab, filter, config, selectedTag]);
  // --- ACTIONS ---

  const toggleTask = async (id: string) => {
    const task = taskList.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.completed;

    // 1. Atualização Otimista
    setTaskList((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updates: Partial<Task> = { completed: newStatus };
          // Lógica otimista para metas
          if (
            (t.type === TaskType.GOAL || t.type === TaskType.DREAM) &&
            newStatus
          ) {
            updates.progress = 100;
            if (t.targetValue) updates.currentValue = t.targetValue;
          }
          return { ...t, ...updates };
        }
        return t;
      }),
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
      prev.map((t) => (t.id === id ? { ...t, isPinned: !t.isPinned } : t)),
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
          return {
            ...t,
            currentValue: newValue,
            progress: newProgress,
            completed: newValue >= target,
          };
        }
        return t;
      }),
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
    selectedTag, 
    setSelectedTag, 
    availableTags, 
    config,
    toggleTask,
    togglePin,
    updateProgressValue,
    deleteTask,
    editTask,
    loading,
    refresh: loadTasks,
  };
};
