"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_controller_1 = require("../controllers/todo.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
// GET ALL TODOS
router.get('/', todo_controller_1.getTodos);
// GET A TODO
router.get('/:id', todo_controller_1.getTodo);
// CREATE TODO
router.post('/', todo_controller_1.createTodo);
// UPDATE TODO
router.put('/:id', todo_controller_1.updateTodo);
// DELETE A TODO
router.delete('/:id', todo_controller_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todo.js.map