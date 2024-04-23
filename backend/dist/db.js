"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const env_1 = __importDefault(require("./env"));
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: env_1.default.POOL_USER,
    password: env_1.default.POOL_PASSWORD,
    host: env_1.default.POOL_HOST,
    port: env_1.default.POOL_PORT,
    database: env_1.default.POOL_DATABASE,
});
//# sourceMappingURL=db.js.map