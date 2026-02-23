import { tasksMocks } from "../tasks.data";
import { Task, TaskType } from "../../../domain/tasks.types";

/**
 * @author HallTech AI
 * Serviço para gerenciamento de tarefas.
 * Utiliza LocalStorage para persistir os dados do Mock, garantindo que
 * exclusões e edições funcionem mesmo após recarregar a página.
 */

const STORAGE_KEY = "ghz_life_tasks_db";

// Helper para carregar o banco de dados local ou iniciar com mocks
const getDb = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Erro ao ler dados locais, resetando para mocks.", e);
  }

  // Se não houver dados salvos, inicia com os mocks padrão e salva
  const initialData = [...tasksMocks];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Helper para salvar alterações
const saveDb = (data: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Erro ao salvar dados locais.", e);
  }
};

export const tasksService = {
  /**
   * Obtém a lista de tarefas do armazenamento local.
   */
  getTasks: async (): Promise<Task[]> => {
    // Simulação de delay de rede para realismo
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getDb();
  },

  /**
   * Atualiza uma tarefa completa (PUT).
   */
  updateTask: async (task: Task): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const db = getDb();
    const index = db.findIndex((t) => t.id === task.id);

    if (index !== -1) {
      db[index] = { ...task };
      saveDb(db);
      console.log(`[API LOCAL] Tarefa atualizada: ${task.id}`);
      return db[index];
    }
    throw new Error("Tarefa não encontrada.");
  },

  /**
   * Cria uma nova tarefa (POST).
   */
  createTask: async (taskData: Partial<Task>): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const db = getDb();
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(), // Garante timestamp se necessário
      completed: false,
      isPinned: false,
    } as Task;

    // Adiciona no início da lista
    db.unshift(newTask);
    saveDb(db);
    console.log(`[API LOCAL] Tarefa criada: ${newTask.id}`);
    return newTask;
  },

  /**
   * Remove uma tarefa (DELETE).
   */
  deleteTask: async (taskId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let db = getDb();
    const initialLength = db.length;
    db = db.filter((t) => t.id !== taskId);

    if (db.length === initialLength) {
      console.warn(
        `[API LOCAL] Tentativa de deletar tarefa inexistente: ${taskId}`,
      );
      // Não lançamos erro aqui para permitir que a UI se atualize (idempotência)
    }

    saveDb(db);
    console.log(`[API LOCAL] Tarefa removida: ${taskId}`);
  },

  /**
   * Alterna status de conclusão e atualiza progresso se necessário (PATCH).
   */
  toggleTaskCompletion: async (taskId: string): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const db = getDb();
    const index = db.findIndex((t) => t.id === taskId);

    if (index !== -1) {
      const task = db[index];
      const newStatus = !task.completed;

      const updates: Partial<Task> = {
        completed: newStatus,
      };

      // REGRA DE NEGÓCIO: Se for Meta/Sonho e estiver completando, define progresso como 100%
      if (
        (task.type === TaskType.GOAL || task.type === TaskType.DREAM) &&
        newStatus
      ) {
        updates.progress = 100;
        if (task.targetValue) {
          updates.currentValue = task.targetValue;
        }
      } else if (
        (task.type === TaskType.GOAL || task.type === TaskType.DREAM) &&
        !newStatus
      ) {
        // Se desmarcar, não necessariamente zera o valor, apenas o status de concluído
        // Opcional: updates.progress = Math.floor((task.currentValue / task.targetValue) * 100);
      }

      db[index] = { ...task, ...updates };
      saveDb(db);

      console.log(`[API LOCAL] Status alterado: ${taskId} -> ${newStatus}`);
      return db[index];
    }

    throw new Error("Tarefa não encontrada.");
  },

  /**
   * Atualiza especificamente o valor numérico de uma meta/sonho.
   * Recalcula a porcentagem e o status de conclusão automaticamente.
   */
  updateTaskValue: async (taskId: string, newValue: number): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const db = getDb();
    const index = db.findIndex((t) => t.id === taskId);

    if (index !== -1) {
      const task = db[index];
      const target = task.targetValue || 1; // Evita divisão por zero

      // Garante que não exceda visualmente limites absurdos, mas permite over-achievement
      let newProgress = Math.round((newValue / target) * 100);

      const updates: Partial<Task> = {
        currentValue: newValue,
        progress: newProgress,
        // Se atingiu ou passou da meta, marca como completo. Se caiu, desmarca.
        completed: newValue >= target,
      };

      db[index] = { ...task, ...updates };
      saveDb(db);
      console.log(
        `[API LOCAL] Valor atualizado: ${taskId} -> ${newValue} (${newProgress}%)`,
      );
      return db[index];
    }
    throw new Error("Tarefa não encontrada.");
  },

  /**
   * Alterna o estado de fixado (Pin) de uma tarefa.
   */
  toggleTaskPin: async (taskId: string): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const db = getDb();
    const index = db.findIndex((t) => t.id === taskId);

    if (index !== -1) {
      const task = db[index];
      db[index] = { ...task, isPinned: !task.isPinned };
      saveDb(db);
      return db[index];
    }
    throw new Error("Tarefa não encontrada.");
  },
};
