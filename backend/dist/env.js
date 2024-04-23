"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
require("dotenv/config");
const env = (0, envalid_1.cleanEnv)(process.env, {
    LOCALHOST_PORT: (0, envalid_1.num)(),
    POOL_USER: (0, envalid_1.str)(),
    POOL_PASSWORD: (0, envalid_1.str)(),
    POOL_HOST: (0, envalid_1.str)(),
    POOL_PORT: (0, envalid_1.num)(),
    POOL_DATABASE: (0, envalid_1.str)(),
});
exports.default = env;
//# sourceMappingURL=env.js.map