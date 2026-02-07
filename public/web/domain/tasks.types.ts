/**
 * @author HallTech AI
 * Níveis de prioridade para tarefas e metas.
 */
export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

/**
 * @author HallTech AI
 * Categorização do item de produtividade.
 */
export enum TaskType {
  DAILY = 'DAILY',       // Tarefas rotineiras
  GOAL = 'GOAL',         // Metas quantitativas
  DREAM = 'DREAM',       // Objetivos de longo prazo
  SHOPPING = 'SHOPPING', // Lista de compras
  NOTE = 'NOTE'          // Anotações livres
}

/**
 * @author HallTech AI
 * Intervalos possíveis para recorrência de tarefas.
 */
export type RecurrenceInterval = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * @author HallTech AI
 * Estrutura principal de um item de produtividade.
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  type: TaskType;
  
  // Campos de Conteúdo
  content?: string;
  notes?: string;
  tags?: string[];
  
  // Agendamento
  dueDate?: string;
  recurrence?: RecurrenceInterval;
  
  // Específico para GOAL/DREAM
  progress?: number;
  targetValue?: number;
  currentValue?: number;
  
  // Específico para SHOPPING
  estimatedCost?: number;
}
