"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_js_1 = __importDefault(require("../controllers/task/tasks.controller.js"));
const auth_controller_js_1 = __importDefault(require("../controllers/auth/auth.controller.js"));
const tags_controller_js_1 = __importDefault(require("../controllers/tag/tags.controller.js"));
const status_controller_js_1 = __importDefault(require("../controllers/status/status.controller.js"));
const todo_controller_js_1 = __importDefault(require("../controllers/todo/todo.controller.js"));
const cookieJwtAuth_js_1 = require("../middleware/cookieJwtAuth.js");
const api = (0, express_1.Router)()
    .use("/tasks", cookieJwtAuth_js_1.cookieJwtAuth, tasks_controller_js_1.default)
    .use("/auth", auth_controller_js_1.default)
    .use("/tags", tags_controller_js_1.default)
    .use("/status", status_controller_js_1.default)
    .use("/todo", todo_controller_js_1.default);
exports.default = (0, express_1.Router)().use('/api', api);
//# sourceMappingURL=routes.js.map