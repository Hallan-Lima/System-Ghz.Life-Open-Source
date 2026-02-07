import { tasksMocks } from "../tasks.data";
import { Task } from "../../../domain/tasks.types";

/**
 * @author HallTech AI
 * Serviço para gerenciamento de tarefas.
 */
export const tasksService = {
  /**
   * Obtém a lista inicial de tarefas.
   */
  getTasks: async (): Promise<Task[]> => {
    // Simulação de delay
    // await new Promise(resolve => setTimeout(resolve, 300));
    return [...tasksMocks];
  },

  /**
   * Simula a atualização de status de uma tarefa no backend.
   */
  toggleTaskCompletion: async (taskId: string, currentStatus: boolean): Promise<boolean> => {
    return !currentStatus;
  },

  /**
   * Simula a criação de uma nova tarefa.
   */
  createTask: async (taskData: Partial<Task>): Promise<void> => {
    console.log("Service: Criando tarefa...", taskData);
    // Em produção, faria um POST para a API.
    return Promise.resolve();
  }
};