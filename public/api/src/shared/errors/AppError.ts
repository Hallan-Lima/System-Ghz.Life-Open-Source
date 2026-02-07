/**
 * @author HallTech AI
 */
export class AppError extends Error {
  readonly statusCode: number;
  readonly errors: string[];

  constructor(message: string, statusCode = 400, errors: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
