/**
 * @author HallTech AI
 */
import mysql from "mysql2/promise";

export const createDatabasePool = () => {
  const host = process.env.DB_HOST ?? "localhost";
  const port = Number(process.env.DB_PORT ?? 3306);
  const database = process.env.DB_NAME ?? "application";
  const user = process.env.DB_USER ?? "app_user";
  const password = process.env.DB_PASSWORD ?? "change-me";

  return mysql.createPool({
    host,
    port,
    database,
    user,
    password,
    waitForConnections: true,
    connectionLimit: 10
  });
};
