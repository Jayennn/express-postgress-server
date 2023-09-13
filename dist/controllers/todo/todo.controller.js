import Express from "express";
import jwt from "jsonwebtoken";
import { getTodo, updateTodo } from "./todo.services.js";
const router = Express.Router();
router.get('/', async (req, res) => {
    try {
        const todo = await getTodo();
        res.json({
            todo
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
router.put('/:id', async (req, res) => {
    const headers = req.headers['authorization'];
    const { id, task_id } = req.query;
    if (!headers) {
        return res.status(403).json({
            message: "Forbidden"
        });
    }
    try {
        const bearer = headers.split(" ");
        const user = jwt.decode(bearer[1]);
        const todo = await updateTodo(req.body, req.params.id, task_id);
        res.json({
            todo,
            message: "Success update"
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
export default router;
//# sourceMappingURL=todo.controller.js.map