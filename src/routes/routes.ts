import { Router } from "express";
import taskController from '../controllers/task/tasks.controller';
import authController from '../controllers/auth/auth.controller';
import tagController from '../controllers/tag/tags.controller';
import statusController from '../controllers/status/status.controller';
import todoController from '../controllers/todo/todo.controller'
import { cookieJwtAuth } from "../middleware/cookieJwtAuth";

const api: Router = Router()
   .use("/tasks", cookieJwtAuth ,taskController)
   .use("/auth", authController)
   .use("/tags", tagController)
   .use("/status", statusController)
   .use("/todo", todoController);

export default Router().use('/api', api) as Router;