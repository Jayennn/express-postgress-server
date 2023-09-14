"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = void 0;
const index_js_1 = require("../../database/index.js");
const getStatus = async (name) => {
    const query = name ? {
        where: {
            name: name
        }
    } : {};
    //@ts-ignore
    const status = await index_js_1.prisma.status.findMany({
        ...query
    });
    return status;
};
exports.getStatus = getStatus;
//# sourceMappingURL=status.services.js.map