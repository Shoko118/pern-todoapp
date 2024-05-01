"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("../controllers/todo");
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET ALL TODOS
router.get('/', todo_1.getTodos);
// GET A TODO
router.get('/:id', todo_1.getTodo);
// CREATE TODO
router.post('/', todo_1.createTodo);
// UPDATE TODO
router.put('/:id', todo_1.updateTodo);
// DELETE A TODO
router.delete('/:id', todo_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todo.js.map