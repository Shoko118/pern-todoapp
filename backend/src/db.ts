import { Pool } from "pg";

export const pool: Pool = new Pool({
  user: "postgres",
  password: "P@ssword123",
  host: "localhost",
  port: 5433,
  database: "todoapp",
});
