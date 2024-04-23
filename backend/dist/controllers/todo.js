"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.getTodos = void 0;
const db_1 = require("../db");
async function getTodos(req, res) {
    try {
        const allTodos = await db_1.pool.query('SELECT * FROM todo');
        res.status(200).json(allTodos.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get all todos' });
    }
}
exports.getTodos = getTodos;
async function getTodo(req, res) {
    try {
        const { id } = req.params;
        const todo = await db_1.pool.query('SELECT * FROM todo WHERE todo_id = $1 RETURNING *', [id]);
        if (todo.rows.length === 0)
            return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(todo.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get a todo' });
    }
}
exports.getTodo = getTodo;
async function createTodo(req, res) {
    try {
        const { description } = req.body;
        const newTodo = await db_1.pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
        res.status(200).json(newTodo.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create todo' });
    }
}
exports.createTodo = createTodo;
async function updateTodo(req, res) {
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
        const updateResult = await db_1.pool.query(updateQuery, todoIds);
        res.status(201).json(updateResult.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
}
exports.updateTodo = updateTodo;
async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const deleteTodo = await db_1.pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);
        res.status(202).json(deleteTodo.rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete todo' });
    }
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.js.map