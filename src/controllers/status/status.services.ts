
import { Prisma } from "@prisma/client";
import { prisma } from "../../database/index.js";



const getStatus = async (name: string) => {

   const query = name ? {
      where: {
         name: name
      }
   } : {}

   const status = await prisma.status.findMany({
      ...query as Prisma.statusFindManyArgs
   })

   return status
}

export {
   getStatus,
}