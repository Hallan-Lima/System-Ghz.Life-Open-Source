/**
 * @author HallTech AI
 */
import express from "express";
import swaggerUi from "swagger-ui-express";
import { createSwaggerSpec } from "../../../config/swagger.js";
import { createRoutes } from "./routes.js";
import { errorHandler } from "../middlewares/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "").split(",").filter(Boolean);
  app.use((request, response, next) => {
    const origin = request.headers.origin;
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      response.setHeader("Access-Control-Allow-Origin", origin ?? "*");
    }
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (request.method === "OPTIONS") {
      return response.sendStatus(204);
    }
    return next();
  });

  app.get("/health", (_request, response) => {
    response.json({ success: true, data: { status: "ok" }, message: "", errors: [] });
  });

  app.use("/api", createRoutes());

  const swaggerSpec = createSwaggerSpec();
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use(errorHandler);

  return app;
};
