"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.updateTodo = void 0;
const index_js_1 = require("../../database/index.js");
const getTodo = async () => {
    const todo = await index_js_1.prisma.todo.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return todo;
};
exports.getTodo = getTodo;
const updateTodo = async (todo, id, task_id) => {
    console.log({
        todo,
        id,
        task_id
    });
    const update = await index_js_1.prisma.todo.update({
        where: {
            id: parseInt(id),
            task_id: parseInt(task_id)
        },
        data: {
            ...(todo.title ? {
                title: todo.title
            } : {}),
            ...(todo.status_id ? {
                status_id: todo.status_id
            } : {})
        }
    });
    return update;
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todo.services.js.map