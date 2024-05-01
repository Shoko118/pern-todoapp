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
exports.TodoService = void 0;
const todo_entity_1 = require("../entities/todo.entity");
const db_1 = require("../db");
class CreateTodoDto {
}
class TodoService {
    constructor() {
        this.todoRepository = db_1.AppDataSource.getRepository(todo_entity_1.Todo);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.todoRepository.find();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepository.findOneBy({ id });
            if (!todo)
                throw new Error('Todo not found');
            return todo;
        });
    }
    create(createTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = this.todoRepository.create(createTodoDto);
            return yield this.todoRepository.save(todo);
        });
    }
    update(id, updateTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepository.findOneBy({ id });
            if (!todo) {
                throw new Error('Todo not found');
            }
            // Only update fields that are provided
            if (updateTodoDto.description !== undefined) {
                todo.description = updateTodoDto.description;
            }
            if (updateTodoDto.is_completed !== undefined) {
                todo.is_completed = updateTodoDto.is_completed;
            }
            yield this.todoRepository.save(todo);
            return todo;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.todoRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new Error('Todo not found');
            }
        });
    }
}
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map