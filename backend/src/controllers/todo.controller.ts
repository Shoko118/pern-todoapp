import { Todo } from '../entities/todo.entity';
import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

const todoService = new TodoService();

export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await todoService.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all todos' });
  }
}

export async function getTodo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const todo = await todoService.findOne(id); // Use service to find a specific todo

    res.json(todo);
  } catch (error) {
    if (error === 'Todo not found') {
      res.status(404).json({ message: error });
    } else {
      res.status(500).json({ message: 'Failed to get a todo' });
    }
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const { description, is_completed } = req.body;
    const newTodo = await todoService.create({ description, is_completed });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { description, is_completed } = req.body;
    const updatedTodo = await todoService.update(id, { description, is_completed });

    res.json(updatedTodo);
  } catch (error) {
    if (error === 'Todo not found') {
      res.status(404).json({ error: error });
    } else {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await todoService.delete(id); // Use service to delete todo

    res.status(202).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    if (error === 'Todo not found') {
      res.status(404).json({ message: error });
    } else {
      res.status(500).json({ message: 'Failed to delete todo' });
    }
  }
}
