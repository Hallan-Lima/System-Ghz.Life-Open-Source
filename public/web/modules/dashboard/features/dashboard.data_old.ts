import { Transaction, TransactionType } from "@/modules/finance/domain/finance.types";
import { Task, TaskPriority, TaskType } from "@/modules/tasks/domain/tasks.types";
import { HealthStats } from "@/modules/health/domain/health.types";

/**
 * @author HallTech AI
 * Mocks de dados para popular o dashboard inicialmente.
 */
export const dashboardMocks = {
  transactions: [
    {
      id: "1",
      title: "Assinatura",
      amount: 0.99,
      type: TransactionType.EXPENSE,
      category: "App",
      date: "2023-10-25",
    },
  ] as Transaction[],
  
  tasks: [
    {
      id: "1",
      title: "Reunião TCC",
      completed: false,
      priority: TaskPriority.HIGH,
      dueDate: "2023-10-30",
      type: TaskType.DAILY,
      content: "",
    },
  ] as Task[],
  
  health: { 
    waterIntake: 1.6, 
    waterGoal: 2.0 
  } as HealthStats
};