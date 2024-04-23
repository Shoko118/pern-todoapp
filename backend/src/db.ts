import env from "./env";
import { Pool } from "pg";

export const pool: Pool = new Pool({
  user: env.POOL_USER,
  password: env.POOL_PASSWORD,
  host: env.POOL_HOST,
  port: env.POOL_PORT,
  database: env.POOL_DATABASE,
});
