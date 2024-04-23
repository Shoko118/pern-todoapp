import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controllers/todo';
import { Router } from 'express';

const router = Router();

// GET ALL TODOS
router.get('/', getTodos);

// GET A TODO
router.get('/:id', getTodo);

// CREATE TODO
router.post('/', createTodo);

// UPDATE TODO
router.put('/:id', updateTodo);

// DELETE A TODO
router.delete('/:id', deleteTodo);

export default router;
