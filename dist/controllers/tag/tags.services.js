import { prisma } from "../../database/index.js";
const getTags = async () => {
    const tasks = await prisma.tag.findMany();
    return tasks;
};
export { getTags, };
//# sourceMappingURL=tags.services.js.map