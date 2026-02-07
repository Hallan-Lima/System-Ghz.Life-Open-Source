/**
 * @author HallTech AI
 */
import type { Request, Response } from "express";
import { createTaskSchema } from "../dtos/createTask.dto.js";
import { updateTaskSchema } from "../dtos/updateTask.dto.js";
import { updateProgressSchema } from "../dtos/updateProgress.dto.js";
import { responseEnvelope } from "../../../shared/infra/http/response.js";
import type { TaskService } from "../services/TaskService.js";
import { AppError } from "../../../shared/errors/AppError.js";

export class TaskController {
  constructor(private readonly service: TaskService) {}

  list = async (request: Request, response: Response) => {
    const tasks = await this.service.list({
      type: request.query.type?.toString(),
      status: request.query.status === "completed" ? "completed" : request.query.status === "pending" ? "pending" : undefined
    });

    response.json(
      responseEnvelope({
        success: true,
        data: tasks,
        message: "Lista carregada com sucesso.",
        errors: []
      })
    );
  };

  create = async (request: Request, response: Response) => {
    const parsed = createTaskSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new AppError("Falha na validação.", 400, parsed.error.issues.map(issue => issue.message));
    }

    const task = await this.service.create(parsed.data);

    response.status(201).json(
      responseEnvelope({
        success: true,
        data: task,
        message: "Task criada com sucesso.",
        errors: []
      })
    );
  };

  update = async (request: Request, response: Response) => {
    const parsed = updateTaskSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new AppError("Falha na validação.", 400, parsed.error.issues.map(issue => issue.message));
    }

    const task = await this.service.update(request.params.id, parsed.data);

    response.json(
      responseEnvelope({
        success: true,
        data: task,
        message: "Task atualizada com sucesso.",
        errors: []
      })
    );
  };

  toggleCompletion = async (request: Request, response: Response) => {
    const task = await this.service.toggleCompletion(request.params.id);

    response.json(
      responseEnvelope({
        success: true,
        data: task,
        message: "Status atualizado.",
        errors: []
      })
    );
  };

  updateProgress = async (request: Request, response: Response) => {
    const parsed = updateProgressSchema.safeParse(request.body);
    if (!parsed.success) {
      throw new AppError("Falha na validação.", 400, parsed.error.issues.map(issue => issue.message));
    }

    const task = await this.service.updateProgress(request.params.id, parsed.data.value);

    response.json(
      responseEnvelope({
        success: true,
        data: task,
        message: "Progresso atualizado.",
        errors: []
      })
    );
  };

  remove = async (request: Request, response: Response) => {
    await this.service.remove(request.params.id);

    response.json(
      responseEnvelope({
        success: true,
        data: null,
        message: "Task removida.",
        errors: []
      })
    );
  };
}
