import prisma from "../../database"

const getTags = async() => {
   const tasks = await prisma.tag.findMany();
   return tasks
}

export {
   getTags,
}