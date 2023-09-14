"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAuthToken = void 0;
const index_js_1 = require("../../database/index.js");
const getUser = async () => {
    const user = await index_js_1.prisma.user.findMany();
    return user;
};
exports.getUser = getUser;
const getAuthToken = async (username) => {
    const userAuth = await index_js_1.prisma.user.findFirst({
        where: {
            username: username
        }
    });
    return userAuth;
};
exports.getAuthToken = getAuthToken;
//# sourceMappingURL=auth.services.js.map