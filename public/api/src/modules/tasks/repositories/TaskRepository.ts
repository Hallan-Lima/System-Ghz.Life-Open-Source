/**
 * @author HallTech AI
 */
import type { AppTask } from "../entities/Task.js";

export type TaskFilters = {
  type?: string;
  status?: "pending" | "completed";
};

export type CreateTaskPayload = Omit<AppTask, "id" | "createdAt" | "updatedAt" | "deletedAt">;

export type UpdateTaskPayload = Partial<Omit<AppTask, "id" | "createdAt" | "deletedAt">>;

export interface TaskRepository {
  list(filters: TaskFilters): Promise<AppTask[]>;
  findById(id: string): Promise<AppTask | null>;
  create(payload: CreateTaskPayload): Promise<AppTask>;
  update(id: string, payload: UpdateTaskPayload): Promise<AppTask>;
  softDelete(id: string): Promise<void>;
}
