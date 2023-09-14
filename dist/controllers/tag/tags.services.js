"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = void 0;
const index_js_1 = require("../../database/index.js");
const getTags = async () => {
    const tasks = await index_js_1.prisma.tag.findMany();
    return tasks;
};
exports.getTags = getTags;
//# sourceMappingURL=tags.services.js.map