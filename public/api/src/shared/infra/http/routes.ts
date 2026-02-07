/**
 * @author HallTech AI
 */
import { Router } from "express";
import { createTaskRouter } from "../../../modules/tasks/controllers/tasks.routes.js";

export const createRoutes = () => {
  const router = Router();

  router.use("/tasks", createTaskRouter());

  return router;
};
