"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./env"));
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/todos', todo_1.default);
app.listen(env_1.default.LOCALHOST_PORT, () => {
    console.log(`Connected to port:${env_1.default.LOCALHOST_PORT}`);
});
//# sourceMappingURL=index.js.map