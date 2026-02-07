/**
 * @author HallTech AI
 */
export type TaskType = "DAILY" | "GOAL" | "DREAM" | "SHOPPING" | "NOTE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type AppTask = {
  id: string;
  title: string;
  type: TaskType;
  priority: TaskPriority;
  isCompleted: boolean;
  isPinned: boolean;
  dueDate: string | null;
  content: string | null;
  tags: string[];
  targetValue: number | null;
  currentValue: number | null;
  estimatedCost: number | null;
  unit: string | null;
  recurrence: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
};
