import { Router } from "express";
import taskController from '../controllers/task/tasks.controller.js';
import authController from '../controllers/auth/auth.controller.js';
import tagController from '../controllers/tag/tags.controller.js';
import statusController from '../controllers/status/status.controller.js';
import todoController from '../controllers/todo/todo.controller.js';
import { cookieJwtAuth } from "../middleware/cookieJwtAuth.js";
const api = Router()
    .use("/tasks", cookieJwtAuth, taskController)
    .use("/auth", authController)
    .use("/tags", tagController)
    .use("/status", statusController)
    .use("/todo", todoController);
export default Router().use('/api', api);
//# sourceMappingURL=routes.js.map