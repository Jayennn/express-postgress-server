
import { prisma } from "../../database/index.js";

type objFieldType = {
   user_id: number,
   title?: string
}

type taskType = {
   title: string,
   description: string,
   status_id: string,
   todo: Array<{
      title: string,
      status_id: string
   }>
}

type TodoType = {
   title: string,
   status_id: string
}

const getTaskById = async (id: string, user_id: number) => {
   const tasks = await prisma.task.findFirst({
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
   })

   return tasks
}

const getTasks = async (objfield: objFieldType) => {

   const searchTitle = objfield.title ? {
      OR: [
         {
            title: {
               contains: objfield.title
            }
         }
      ]
   } : {}


   const tasks = await prisma.task.findMany({
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
   })

   return tasks;

}

const createTask = async (
   title: string,
   description: string,
   tag_id: string[],
   user_id: number,
   todo: TodoType[]
) => {

   const create = await prisma.task.create({
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
   })

   return create
}


const updateTask = async (task: taskType, id: string, user_id: number) => {

   console.log(task.status_id)
   const existingStatus = prisma.status.findFirst({
      where: {
         id: task.status_id
      }
   })

   if (!existingStatus) {
      throw new Error("Record to update status does not exist.");
   }


   const updateTask = await prisma.task.update({
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
   })

   return updateTask
}


const deleteTask = async (id: string, user_id: number) => {

   const existingLaporan = await prisma.task.findFirst({
      where: {
         user_id: user_id,
         id: parseInt(id)
      }
   });


   if (!existingLaporan) {
      throw new Error("Record to delete does not exist.");
   }

   // Delete related task_tag entries
   await prisma.task_tag.deleteMany({
      where: {
         task_id: parseInt(id)
      }
   });

   await prisma.todo.deleteMany({
      where: {
         task_id: parseInt(id)
      }
   })

   const task = await prisma.task.delete({
      where: {
         user_id: user_id,
         id: parseInt(id),
         // task_tag: {
         //    some: {
         //       laporan_id: parseInt(id)
         //    }
         // }
      },
   })

   return task
}

export {
   createTask,
   getTaskById,
   getTasks,
   updateTask,
   deleteTask
}