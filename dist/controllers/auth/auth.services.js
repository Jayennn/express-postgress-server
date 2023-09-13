import { prisma } from "../../database/index.js";
const getUser = async () => {
    const user = await prisma.user.findMany();
    return user;
};
const getAuthToken = async (username) => {
    const userAuth = await prisma.user.findFirst({
        where: {
            username: username
        }
    });
    return userAuth;
};
export { getAuthToken, getUser };
//# sourceMappingURL=auth.services.js.map