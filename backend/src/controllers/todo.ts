import { Todo } from '../entities/todo.entity';
import { Request, Response } from 'express';

export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all todos' });
  }
}

export async function getTodo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const todo = await Todo.findOneBy({ id: id });

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get a todo' });
  }
}

export async function createTodo(req: Request, res: Response) {
  try {
    const { description } = req.body;
    const todo = Todo.create({ description, iscomplete: false });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
}

export async function updateTodo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { description, iscomplete } = req.body;
    const todo = await Todo.findOneBy({ id: id });

    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    todo.description = description || todo.description;
    todo.iscomplete = iscomplete !== undefined ? iscomplete : todo.iscomplete;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
}

export async function deleteTodo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const result = await Todo.delete(id);

    if (result.affected === 0) return res.status(404).json({ message: 'Todo not found' });

    res.status(202).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
}
