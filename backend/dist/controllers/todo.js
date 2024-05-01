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
const todo_entity_1 = require("../entities/todo.entity");
function getTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield todo_entity_1.Todo.find();
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
            const todo = yield todo_entity_1.Todo.findOneBy({ id: id });
            if (!todo)
                return res.status(404).json({ message: 'Todo not found' });
            res.json(todo);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to get a todo' });
        }
    });
}
exports.getTodo = getTodo;
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { description } = req.body;
            const todo = todo_entity_1.Todo.create({ description, iscomplete: false });
            yield todo.save();
            res.status(201).json(todo);
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
            const id = parseInt(req.params.id);
            const { description, iscomplete } = req.body;
            const todo = yield todo_entity_1.Todo.findOneBy({ id: id });
            if (!todo)
                return res.status(404).json({ error: 'Todo not found' });
            todo.description = description || todo.description;
            todo.iscomplete = iscomplete !== undefined ? iscomplete : todo.iscomplete;
            yield todo.save();
            res.json(todo);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update todo' });
        }
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const result = yield todo_entity_1.Todo.delete(id);
            if (result.affected === 0)
                return res.status(404).json({ message: 'Todo not found' });
            res.status(202).json({ message: 'Todo deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to delete todo' });
        }
    });
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.js.map