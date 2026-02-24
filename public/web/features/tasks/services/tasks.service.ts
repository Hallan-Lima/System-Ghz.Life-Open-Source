import { tasksMocks } from "../tasks.data";
import { Task, TaskType } from "../../../domain/tasks.types";
import { api } from "../../../services/api";
import config from "../../../src/config";

/**
 * @author HallTech AI
 * @description: Este serviço é responsável por toda a comunicação com a API e também pela gestão do cache local.
 */

const STORAGE_TASK = config.tasksStorageKey;
const STORAGE_CONFIG = config.configStorageKey;

// Helper para pegar o ID do usuário logado
const getUserId = () => {
  const stored = localStorage.getItem(STORAGE_CONFIG);
  const userConfig = stored ? JSON.parse(stored) : {};
  return userConfig?.user_id;
};

// Helper para carregar o banco de dados local ou iniciar com mocks
const getDb = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_TASK);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Erro ao ler dados locais, resetando para mocks.", e);
  }
  const initialData = [...tasksMocks];
  localStorage.setItem(STORAGE_TASK, JSON.stringify(initialData));
  return initialData;
};

// Helper para salvar alterações no Storage Local
const saveDb = (data: Task[]) => {
  try {
    localStorage.setItem(STORAGE_TASK, JSON.stringify(data));
  } catch (e) {
    console.error("Erro ao salvar dados locais.", e);
  }
};

export const tasksService = {
  /**
   * Obtém a lista de tarefas reais da API e atualiza o cache local.
   */
  getTasks: async (): Promise<Task[]> => {
    try {
      const userId = getUserId();
      // Manda o ID do usuário para a API listar apenas as tarefas dele
      const endpoint = userId ? `tasks?user_id=${userId}` : "tasks";
      const response = await api.get(endpoint);

      if (response.data && response.data.success) {
        const apiTasks = response.data.data;
        // Sincroniza o banco de dados local com a verdade que veio do servidor
        saveDb(apiTasks);
        return apiTasks;
      }

      return getDb(); // Fallback se a API não retornar sucesso
    } catch (error) {
      console.error("Erro ao buscar tarefas da API, usando cache local", error);
      return getDb(); // Se a API estiver offline, o sistema não quebra
    }
  },

  /**
   * Atualiza uma tarefa completa (PUT).
   */
  updateTask: async (task: any): Promise<any> => {
    try {
      await api.put(`tasks/${task.id}`, task);

      const currentTasks = JSON.parse(
        localStorage.getItem(STORAGE_TASK) || "[]",
      );
      const updatedTasks = currentTasks.map((t: any) =>
        t.id === task.id ? task : t,
      );
      localStorage.setItem(STORAGE_TASK, JSON.stringify(updatedTasks));

      return task;
    } catch (error) {
      console.error("Falha ao atualizar na API", error);
      throw error;
    }
  },

  /**
   * Cria uma nova tarefa (POST).
   */
  createTask: async (task: any): Promise<any> => {
    try {
      const response = await api.post("tasks", task);
      const finalTask = response.data?.data || task;

      const currentTasks = JSON.parse(
        localStorage.getItem(STORAGE_TASK) || "[]",
      );
      currentTasks.push(finalTask);
      localStorage.setItem(STORAGE_TASK, JSON.stringify(currentTasks));

      return finalTask;
    } catch (error) {
      console.error("Falha ao criar na API", error);
      throw error;
    }
  },

  /**
   * Remove uma tarefa (DELETE).
   */
  deleteTask: async (taskId: string): Promise<void> => {
    try {
      await api.delete(`tasks/${taskId}`);
    } catch (error) {
      console.error("Falha ao deletar na API", error);
      throw error;
    }

    // 2. Storage Local (Atualização Visual)
    let db = getDb();
    db = db.filter((t) => String(t.id) !== String(taskId));
    saveDb(db);
  },

  /**
   * Alterna status de conclusão e atualiza progresso se necessário (PATCH).
   */
  toggleTaskCompletion: async (taskId: string): Promise<Task> => {
    const db = getDb();
    const index = db.findIndex((t) => String(t.id) === String(taskId));

    if (index !== -1) {
      const task = db[index];
      const newStatus = !task.completed;

      const updates: Partial<Task> = {
        completed: newStatus,
      };

      if (
        (task.type === TaskType.GOAL || task.type === TaskType.DREAM) &&
        newStatus
      ) {
        updates.progress = 100;
        if (task.targetValue) updates.currentValue = task.targetValue;
      }

      db[index] = { ...task, ...updates };
      saveDb(db);

      // 2. Sincroniza com a API em Background
      try {
        await api.patch(`tasks/${taskId}/toggle`);
      } catch (error) {
        console.error("Falha ao alternar status na API", error);
      }

      return db[index];
    }
    throw new Error("Tarefa não encontrada.");
  },

  /**
   * Atualiza especificamente o valor numérico de uma meta/sonho (PATCH).
   */
  updateTaskValue: async (taskId: string, newValue: number): Promise<Task> => {
    const db = getDb();
    const index = db.findIndex((t) => String(t.id) === String(taskId));

    if (index !== -1) {
      const task = db[index];
      const target = task.targetValue || 1;

      let newProgress = Math.round((newValue / target) * 100);

      const updates: Partial<Task> = {
        currentValue: newValue,
        progress: newProgress,
        completed: newValue >= target,
      };

      // 1. Atualiza Visualmente
      db[index] = { ...task, ...updates };
      saveDb(db);

      // 2. Sincroniza com a API
      try {
        // Envia o JSON com a chave "value" igual o seu TaskController.php espera
        await api.patch(`tasks/${taskId}/progress`, { value: newValue });
      } catch (error) {
        console.error("Falha ao atualizar progresso na API", error);
      }

      return db[index];
    }
    throw new Error("Tarefa não encontrada.");
  },

  /**
   * Alterna o estado de fixado (Pin) de uma tarefa (PATCH).
   */
  toggleTaskPin: async (taskId: string): Promise<Task> => {
    const db = getDb();
    const index = db.findIndex((t) => String(t.id) === String(taskId));

    if (index !== -1) {
      // 1. Atualiza Visualmente
      db[index] = { ...db[index], isPinned: !db[index].isPinned };
      saveDb(db);

      // 2. Sincroniza com a API
      try {
        await api.patch(`tasks/${taskId}/pin`);
      } catch (error) {
        console.error("Falha ao fixar tarefa na API", error);
      }

      return db[index];
    }
    throw new Error("Tarefa não encontrada.");
  },
};
