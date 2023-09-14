"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_services_js_1 = require("./tasks.services.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
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
        const user = jsonwebtoken_1.default.decode(bearer[1]);
        const tasks = await (0, tasks_services_js_1.createTask)(title, description, tag_id, user.id, todo);
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
        const user = jsonwebtoken_1.default.decode(bearer[1]);
        const tasks = await (0, tasks_services_js_1.getTasks)({
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
        const user = jsonwebtoken_1.default.decode(bearer[1]);
        const tasks = await (0, tasks_services_js_1.getTaskById)(req.params.id, user.id);
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
        const user = jsonwebtoken_1.default.decode(bearer[1]);
        const tasks = await (0, tasks_services_js_1.updateTask)(req.body, req.params.id, user.id);
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
        const user = jsonwebtoken_1.default.decode(bearer[1]);
        await (0, tasks_services_js_1.deleteTask)(req.params.id, user.id);
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
exports.default = router;
//# sourceMappingURL=tasks.controller.js.map