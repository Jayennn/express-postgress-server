import prisma from "../../database"

type TodoType = {
   title: string,
   status_id: string
}

const getTodo = async() => {
   const todo = await prisma.todo.findMany({
      orderBy: {
         id: "asc"
      }
   })
   return todo
}

const updateTodo = async (
   todo: TodoType,
   id: string,
   task_id: string,
) => {
   console.log({
      todo, 
      id, 
      task_id
   })
   const update = await prisma.todo.update({
      where: {
         id: parseInt(id),
         task_id: parseInt(task_id)
      },
      data: {
         ...(todo.title ? {
            title: todo.title
         } : {}),

         ...(todo.status_id ? {
            status_id: todo.status_id
         } : {})
      }
   })

   return update
}

export {
   updateTodo,
   getTodo
}