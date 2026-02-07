/**
 * @author HallTech AI
 */
import { Router } from "express";
import { createDatabasePool } from "../../../config/database.js";
import { TaskController } from "./TaskController.js";
import { MysqlTaskRepository } from "../repositories/MysqlTaskRepository.js";
import { TaskService } from "../services/TaskService.js";

export const createTaskRouter = () => {
  const router = Router();
  const pool = createDatabasePool();
  const repository = new MysqlTaskRepository(pool);
  const service = new TaskService(repository);
  const controller = new TaskController(service);

  /**
   * @openapi
   * /api/tasks:
   *   get:
   *     summary: Lista tasks
   *     parameters:
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [pending, completed]
   *     responses:
   *       200:
   *         description: Lista carregada.
   */
  router.get("/", controller.list);

  /**
   * @openapi
   * /api/tasks:
   *   post:
   *     summary: Cria uma task
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       201:
   *         description: Criada.
   */
  router.post("/", controller.create);

  /**
   * @openapi
   * /api/tasks/{id}:
   *   put:
   *     summary: Atualiza uma task
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Atualizada.
   */
  router.put("/:id", controller.update);

  /**
   * @openapi
   * /api/tasks/{id}/toggle:
   *   patch:
   *     summary: Alterna conclusão
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Status atualizado.
   */
  router.patch("/:id/toggle", controller.toggleCompletion);

  /**
   * @openapi
   * /api/tasks/{id}/progress:
   *   patch:
   *     summary: Atualiza progresso
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Progresso atualizado.
   */
  router.patch("/:id/progress", controller.updateProgress);

  /**
   * @openapi
   * /api/tasks/{id}:
   *   delete:
   *     summary: Remove uma task
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Removida.
   */
  router.delete("/:id", controller.remove);

  return router;
};
