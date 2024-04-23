import cors from "cors";
import { pool } from "./db";
import express from "express";
import env from "./env";

const app = express();
app.use(cors());
app.use(express.json());

// create todo
app.post("/todos", async (req: express.Request, res: express.Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// get todos
app.get("/todos", async (req: express.Request, res: express.Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log("GET TODOS ERR", error);
  }
});

// get a todo
app.get("/todos/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log("GET A TODO ERR", error);
  }
});

// update a todo
app.put("/todos/:id", async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);

    res.json("Updated a todo");
  } catch (error) {
    console.log("UPDATE A TODO ERR", error);
  }
});

// delete a todo
app.delete(
  "/todos/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

      res.json("Deleted a todo");
    } catch (error) {
      console.log("DELETE A TODO ERR", error);
    }
  }
);

app.listen(env.LOCALHOST_PORT, () => {
  console.log(`Connected to port:${env.LOCALHOST_PORT}`);
});
