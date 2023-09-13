import Express from "express";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "./tasks.services.js";
import jwt from "jsonwebtoken";
const router = Express.Router();
router.post("/", async (req, res) => {
    const headers = req.headers['authorization'];
    const { title, description, tag_id, todo } = req.body;
    if (!headers) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const bearer = headers.split(" ");
        const user = jwt.decode(bearer[1]);
        const tasks = await createTask(title, description, tag_id, user.id, todo);
        res.json({
            task: tasks
        });
    }
    catch (err) {
        res.json({
            error: "error"
        });
    }
});
router.get('/', async (req, res) => {
    const headers = req.headers['authorization'];
    const { title } = req.query;
    if (!headers) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const bearer = headers.split(" ");
        const user = jwt.decode(bearer[1]);
        const tasks = await getTasks({
            user_id: user.id,
            title: title
        });
        res.json({
            tasks: tasks
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
router.get('/:id', async (req, res, next) => {
    const headers = req.headers['authorization'];
    if (!headers) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const bearer = headers.split(" ");
        const user = jwt.decode(bearer[1]);
        const tasks = await getTaskById(req.params.id, user.id);
        res.json({
            tasks
        });
    }
    catch (error) {
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    console.log({
        bodyTask: req.body,
        param: req.params.id,
    });
    const headers = req.headers['authorization'];
    if (!headers) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const bearer = headers.split(" ");
        const user = jwt.decode(bearer[1]);
        const tasks = await updateTask(req.body, req.params.id, user.id);
        res.json({
            tasks,
            message: "success update"
        });
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:id', async (req, res) => {
    const headers = req.headers['authorization'];
    if (!headers) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const bearer = headers.split(" ");
        const user = jwt.decode(bearer[1]);
        await deleteTask(req.params.id, user.id);
        res.json({
            message: "Success delete task"
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
export default router;
//# sourceMappingURL=tasks.controller.js.map