/**
 * @author HallTech AI
 */
import type { AppTask, TaskType } from "../entities/Task.js";
import type { CreateTaskInput } from "../dtos/createTask.dto.js";
import type { UpdateTaskInput } from "../dtos/updateTask.dto.js";
import type { TaskFilters, TaskRepository } from "../repositories/TaskRepository.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async list(filters: TaskFilters): Promise<AppTask[]> {
    return this.repository.list(filters);
  }

  async create(input: CreateTaskInput): Promise<AppTask> {
    const payload: Omit<AppTask, "id" | "createdAt" | "updatedAt" | "deletedAt"> = {
      title: input.title,
      type: input.type,
      priority: input.priority ?? "MEDIUM",
      isCompleted: false,
      isPinned: false,
      dueDate: input.dueDate ?? null,
      content: input.content ?? null,
      tags: input.tags ?? [],
      targetValue: input.targetValue ?? null,
      currentValue: input.currentValue ?? null,
      estimatedCost: input.estimatedCost ?? null,
      unit: input.unit ?? "un",
      recurrence: input.recurrence ?? null
    };

    return this.repository.create(payload);
  }

  async update(id: string, input: UpdateTaskInput): Promise<AppTask> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError("Task não encontrada.", 404);
    }

    return this.repository.update(id, input);
  }

  async toggleCompletion(id: string): Promise<AppTask> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new AppError("Task não encontrada.", 404);
    }

    const isCompleted = !task.isCompleted;
    const updates: Partial<AppTask> = { isCompleted };

    if (this.isGoalOrDream(task.type) && isCompleted) {
      updates.currentValue = task.targetValue;
    }

    return this.repository.update(id, updates);
  }

  async updateProgress(id: string, value: number): Promise<AppTask> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new AppError("Task não encontrada.", 404);
    }

    const isCompleted = task.targetValue !== null ? value >= task.targetValue : task.isCompleted;

    return this.repository.update(id, { currentValue: value, isCompleted });
  }

  async remove(id: string): Promise<void> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new AppError("Task não encontrada.", 404);
    }

    await this.repository.softDelete(id);
  }

  private isGoalOrDream(type: TaskType): boolean {
    return type === "GOAL" || type === "DREAM";
  }
}
