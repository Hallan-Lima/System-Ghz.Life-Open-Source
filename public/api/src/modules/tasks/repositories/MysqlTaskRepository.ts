/**
 * @author HallTech AI
 */
import type { Pool } from "mysql2/promise";
import { randomUUID } from "node:crypto";
import type { AppTask } from "../entities/Task.js";
import type { CreateTaskPayload, TaskFilters, TaskRepository, UpdateTaskPayload } from "./TaskRepository.js";

export class MysqlTaskRepository implements TaskRepository {
  constructor(private readonly pool: Pool) {}

  async list(filters: TaskFilters): Promise<AppTask[]> {
    const conditions: string[] = ["deleted_at IS NULL"];
    const values: Array<string | number> = [];

    if (filters.type) {
      conditions.push("type = ?");
      values.push(filters.type);
    }

    if (filters.status) {
      conditions.push("is_completed = ?");
      values.push(filters.status === "completed" ? 1 : 0);
    }

    const sql = `
      SELECT
        id,
        title,
        type,
        priority,
        is_completed as isCompleted,
        is_pinned as isPinned,
        due_date as dueDate,
        content,
        tags,
        target_value as targetValue,
        current_value as currentValue,
        estimated_cost as estimatedCost,
        unit,
        recurrence,
        created_at as createdAt,
        updated_at as updatedAt,
        deleted_at as deletedAt
      FROM app_tasks
      WHERE ${conditions.join(" AND ")}
      ORDER BY created_at DESC
    `;

    const [rows] = await this.pool.query(sql, values);
    return (rows as any[]).map(this.mapRow);
  }

  async findById(id: string): Promise<AppTask | null> {
    const [rows] = await this.pool.query(
      `SELECT
        id,
        title,
        type,
        priority,
        is_completed as isCompleted,
        is_pinned as isPinned,
        due_date as dueDate,
        content,
        tags,
        target_value as targetValue,
        current_value as currentValue,
        estimated_cost as estimatedCost,
        unit,
        recurrence,
        created_at as createdAt,
        updated_at as updatedAt,
        deleted_at as deletedAt
      FROM app_tasks
      WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );

    const row = (rows as any[])[0];
    return row ? this.mapRow(row) : null;
  }

  async create(payload: CreateTaskPayload): Promise<AppTask> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    await this.pool.query(
      `INSERT INTO app_tasks (
        id, title, type, priority, is_completed, is_pinned,
        due_date, content, tags, target_value, current_value,
        estimated_cost, unit, recurrence, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      , [
        id,
        payload.title,
        payload.type,
        payload.priority,
        payload.isCompleted ? 1 : 0,
        payload.isPinned ? 1 : 0,
        payload.dueDate,
        payload.content,
        JSON.stringify(payload.tags ?? []),
        payload.targetValue,
        payload.currentValue,
        payload.estimatedCost,
        payload.unit,
        payload.recurrence,
        createdAt
      ]
    );

    return {
      ...payload,
      id,
      createdAt,
      updatedAt: null,
      deletedAt: null
    };
  }

  async update(id: string, payload: UpdateTaskPayload): Promise<AppTask> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error("Task não encontrada.");
    }

    const updatedAt = new Date().toISOString();
    const merged = { ...existing, ...payload, updatedAt };

    await this.pool.query(
      `UPDATE app_tasks SET
        title = ?,
        type = ?,
        priority = ?,
        is_completed = ?,
        is_pinned = ?,
        due_date = ?,
        content = ?,
        tags = ?,
        target_value = ?,
        current_value = ?,
        estimated_cost = ?,
        unit = ?,
        recurrence = ?,
        updated_at = ?
      WHERE id = ?`,
      [
        merged.title,
        merged.type,
        merged.priority,
        merged.isCompleted ? 1 : 0,
        merged.isPinned ? 1 : 0,
        merged.dueDate,
        merged.content,
        JSON.stringify(merged.tags ?? []),
        merged.targetValue,
        merged.currentValue,
        merged.estimatedCost,
        merged.unit,
        merged.recurrence,
        updatedAt,
        id
      ]
    );

    return merged;
  }

  async softDelete(id: string): Promise<void> {
    await this.pool.query("UPDATE app_tasks SET deleted_at = ? WHERE id = ?", [new Date(), id]);
  }

  private mapRow(row: any): AppTask {
    return {
      id: row.id,
      title: row.title,
      type: row.type,
      priority: row.priority,
      isCompleted: Boolean(row.isCompleted),
      isPinned: Boolean(row.isPinned),
      dueDate: row.dueDate ? new Date(row.dueDate).toISOString() : null,
      content: row.content,
      tags: row.tags ? JSON.parse(row.tags) : [],
      targetValue: row.targetValue,
      currentValue: row.currentValue,
      estimatedCost: row.estimatedCost,
      unit: row.unit,
      recurrence: row.recurrence,
      createdAt: new Date(row.createdAt).toISOString(),
      updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : null,
      deletedAt: row.deletedAt ? new Date(row.deletedAt).toISOString() : null
    };
  }
}
