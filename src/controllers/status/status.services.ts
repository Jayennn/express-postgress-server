import { Prisma } from '@prisma/client';
import { prisma } from "../../database/index.js";



const getStatus = async (name: string) => {

   const query: Prisma.statusFindManyArgs = name ? {
      where: {
         name: name
      }
   } : {}

   const status = await prisma.status.findMany({
      ...query
   })

   return status
}

export {
   getStatus,
}