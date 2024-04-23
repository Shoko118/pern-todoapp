import { pool } from '../db';
import { Request, Response } from 'express';

export async function getTodos(req: Request, res: Response) {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all todos' });
  }
}

export async function getTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1 RETURNING *', [id]);

    if (todo.rows.length === 0) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get a todo' });
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
}

export async function updateTodo(req: Request, res: Response) {
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
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);

    res.status(202).json(deleteTodo.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
}
