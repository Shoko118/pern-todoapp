"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.getTodos = void 0;
const todo_service_1 = require("../services/todo.service");
const todoService = new todo_service_1.TodoService();
function getTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield todoService.findAll();
            res.json(todos);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to get all todos' });
        }
    });
}
exports.getTodos = getTodos;
function getTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const todo = yield todoService.findOne(id); // Use service to find a specific todo
            res.json(todo);
        }
        catch (error) {
            if (error === 'Todo not found') {
                res.status(404).json({ message: error });
            }
            else {
                res.status(500).json({ message: 'Failed to get a todo' });
            }
        }
    });
}
exports.getTodo = getTodo;
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { description, is_completed } = req.body;
            const newTodo = yield todoService.create({ description, is_completed });
            res.status(201).json(newTodo);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to create todo' });
        }
    });
}
exports.createTodo = createTodo;
function updateTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const { description, is_completed } = req.body;
            const updatedTodo = yield todoService.update(id, { description, is_completed });
            res.json(updatedTodo);
        }
        catch (error) {
            if (error === 'Todo not found') {
                res.status(404).json({ error: error });
            }
            else {
                res.status(500).json({ error: 'Failed to update todo' });
            }
        }
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            yield todoService.delete(id); // Use service to delete todo
            res.status(202).json({ message: 'Todo deleted successfully' });
        }
        catch (error) {
            if (error === 'Todo not found') {
                res.status(404).json({ message: error });
            }
            else {
                res.status(500).json({ message: 'Failed to delete todo' });
            }
        }
    });
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.controller.js.map