
import { prisma } from "../../database/index.js";



const getStatus = async (name: string) => {

   const query = name ? {
      where: {
         name: name
      }
   } : {}

   //@ts-ignore
   const status = await prisma.status.findMany({
      ...query 
   })

   return status
}

export {
   getStatus,
}