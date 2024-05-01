"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const todo_entity_1 = require("./entities/todo.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    port: Number(env_1.DB_PORT),
    username: env_1.DB_USER,
    password: env_1.DB_PASSWORD,
    host: env_1.DB_HOST,
    database: env_1.DB_DATABASE,
    entities: [todo_entity_1.Todo],
    synchronize: true,
});
//# sourceMappingURL=db.js.map