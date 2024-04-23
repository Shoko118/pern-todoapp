import cors from 'cors';
import { pool } from './db';
import express from 'express';
import env from './env';

const app = express();
app.use(cors());
app.use(express.json());

// create todo
app.post('/todos', async (req: express.Request, res: express.Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// get todos
app.get('/todos', async (req: express.Request, res: express.Response) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.log('GET TODOS ERR', error);
  }
});

// get a todo
app.get('/todos/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1 RETURNING *', [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log('GET A TODO ERR', error);
  }
});

// update a todo
app.put('/todos/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { description, iscomplete } = req.body;

  const sets = [];
  const todoIds = [];

  try {
    if (description !== undefined) {
      sets.push('description = $1');
      todoIds.push(description);
    }

    if (iscomplete !== undefined) {
      sets.push('iscomplete = $' + (todoIds.length + 1));
      todoIds.push(iscomplete);
    }

    if (sets.length === 0) {
      return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    todoIds.push(id);
    const updateQuery = `UPDATE todo SET ${sets.join(', ')} WHERE todo_id = $${todoIds.length} RETURNING *`;
    console.log(updateQuery);

    const updateResult = await pool.query(updateQuery, todoIds);
    res.status(201).json(updateResult.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// delete a todo
app.delete('/todos/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);

    res.status(202).json(deleteTodo.rows[0]);
  } catch (error) {
    console.log('DELETE A TODO ERR', error);
  }
});

app.listen(env.LOCALHOST_PORT, () => {
  console.log(`Connected to port:${env.LOCALHOST_PORT}`);
});
