
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum TaskType {
  DAILY = 'DAILY',      // Tarefas simples do dia a dia
  GOAL = 'GOAL',        // Metas com prazo e progresso (ex: Ler 10 livros)
  DREAM = 'DREAM',      // Objetivos de longo prazo/Financeiros (ex: Comprar carro)
  SHOPPING = 'SHOPPING', // Lista de itens simples
  NOTE = 'NOTE'         // Anotações rápidas ou textos longos
}

export type RecurrenceInterval = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  dueDate?: string;
  type: TaskType;
  
  // New Fields
  recurrence?: RecurrenceInterval;
  notes?: string;
  tags?: string[];
  
  // Goal/Dream specific
  progress?: number;      // 0 to 100
  targetValue?: number;   // e.g. 10 books, or R$ 50000
  currentValue?: number;  // e.g. 2 books, or R$ 10000
  
  // Shopping specific
  estimatedCost?: number;
}

export interface HealthStats {
  waterIntake: number; // in liters
  waterGoal: number; // in liters
  lastMedication?: {
    name: string;
    time: string;
  };
}

export interface UserStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  pendingTasks: number;
  health: HealthStats;
}