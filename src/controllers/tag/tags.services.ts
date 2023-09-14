import { prisma } from "../../database/index";

const getTags = async() => {
   const tasks = await prisma.tag.findMany();
   return tasks
}

export {
   getTags,
}