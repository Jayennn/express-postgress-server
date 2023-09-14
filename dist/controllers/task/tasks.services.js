"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.getTaskById = exports.createTask = void 0;
const index_js_1 = require("../../database/index.js");
const getTaskById = async (id, user_id) => {
    const tasks = await index_js_1.prisma.task.findFirst({
        where: {
            id: parseInt(id),
            user_id: user_id
        },
        include: {
            status: true,
            task_tag: true,
            todo: {
                orderBy: {
                    id: "asc"
                }
            }
        }
    });
    return tasks;
};
exports.getTaskById = getTaskById;
const getTasks = async (objfield) => {
    const searchTitle = objfield.title ? {
        OR: [
            {
                title: {
                    contains: objfield.title
                }
            }
        ]
    } : {};
    const tasks = await index_js_1.prisma.task.findMany({
        where: {
            user_id: objfield.user_id,
            ...searchTitle
        },
        orderBy: {
            id: "asc"
        },
        include: {
            status: true,
            task_tag: true,
            todo: {
                orderBy: {
                    id: "asc"
                }
            }
        }
    });
    return tasks;
};
exports.getTasks = getTasks;
const createTask = async (title, description, tag_id, user_id, todo) => {
    const create = await index_js_1.prisma.task.create({
        data: {
            title: title,
            description: description,
            user_id: user_id,
            task_tag: {
                createMany: {
                    data: tag_id.map((tag) => ({
                        tag_id: tag
                    }))
                },
            },
            status_id: "on going",
            todo: {
                createMany: {
                    data: todo.map((todo) => ({
                        title: todo.title,
                        status_id: "on going"
                    }))
                }
            }
        },
        include: {
            status: true,
            todo: true,
            task_tag: true,
        },
    });
    return create;
};
exports.createTask = createTask;
const updateTask = async (task, id, user_id) => {
    console.log(task.status_id);
    const existingStatus = index_js_1.prisma.status.findFirst({
        where: {
            id: task.status_id
        }
    });
    if (!existingStatus) {
        throw new Error("Record to update status does not exist.");
    }
    const updateTask = await index_js_1.prisma.task.update({
        where: {
            user_id,
            id: parseInt(id),
        },
        data: {
            ...(task.title ? {
                title: task.title
            } : {}),
            ...(task.description ? {
                description: task.description
            } : {}),
            ...(task.status_id ? {
                status_id: task.status_id
            } : {}),
        }
    });
    return updateTask;
};
exports.updateTask = updateTask;
const deleteTask = async (id, user_id) => {
    const existingLaporan = await index_js_1.prisma.task.findFirst({
        where: {
            user_id: user_id,
            id: parseInt(id)
        }
    });
    if (!existingLaporan) {
        throw new Error("Record to delete does not exist.");
    }
    // Delete related task_tag entries
    await index_js_1.prisma.task_tag.deleteMany({
        where: {
            task_id: parseInt(id)
        }
    });
    await index_js_1.prisma.todo.deleteMany({
        where: {
            task_id: parseInt(id)
        }
    });
    const task = await index_js_1.prisma.task.delete({
        where: {
            user_id: user_id,
            id: parseInt(id),
            // task_tag: {
            //    some: {
            //       laporan_id: parseInt(id)
            //    }
            // }
        },
    });
    return task;
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=tasks.services.js.map