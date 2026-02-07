/**
 * @author HallTech AI
 */
import swaggerJSDoc from "swagger-jsdoc";

export const createSwaggerSpec = () =>
  swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Ghz.Life BFF",
        version: "0.1.0",
        description: "API BFF do System Ghz.Life"
      }
    },
    apis: ["./src/modules/**/*.ts"]
  });
