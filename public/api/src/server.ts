/**
 * @author HallTech AI
 */
import { createServer } from "node:http";
import { loadEnv } from "./config/env.js";
import { createApp } from "./shared/infra/http/app.js";

loadEnv();

const app = createApp();
const port = Number(process.env.PORT ?? 3333);

const server = createServer(app);

server.listen(port, () => {
  console.log(`[bff] servidor ativo em http://localhost:${port}`);
});
