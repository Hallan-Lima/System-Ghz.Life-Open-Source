/**
 * @author HallTech AI
 */
import type { ErrorRequestHandler } from "express";
import { AppError } from "../../errors/AppError.js";
import { responseEnvelope } from "../http/response.js";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json(
      responseEnvelope({
        success: false,
        data: null,
        message: error.message,
        errors: error.errors
      })
    );
  }

  console.error("[bff] erro inesperado", error);

  return response.status(500).json(
    responseEnvelope({
      success: false,
      data: null,
      message: "Erro interno inesperado.",
      errors: []
    })
  );
};
