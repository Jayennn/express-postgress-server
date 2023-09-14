"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todo_services_js_1 = require("./todo.services.js");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const todo = await (0, todo_services_js_1.getTodo)();
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
        const user = jsonwebtoken_1.default.decode(bearer[1]);
        const todo = await (0, todo_services_js_1.updateTodo)(req.body, req.params.id, task_id);
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
exports.default = router;
//# sourceMappingURL=todo.controller.js.map