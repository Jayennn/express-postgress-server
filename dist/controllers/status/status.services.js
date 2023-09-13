import { prisma } from "../../database/index.js";
const getStatus = async (name) => {
    const query = name ? {
        where: {
            name: name
        }
    } : {};
    const status = await prisma.status.findMany({
        ...query
    });
    return status;
};
export { getStatus, };
//# sourceMappingURL=status.services.js.map