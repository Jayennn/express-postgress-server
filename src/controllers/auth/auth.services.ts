import { prisma } from "../../database/index";


const getUser = async () => {
   const user = await prisma.user.findMany()
   return user;
}

const getAuthToken = async(username: string) => {
   const userAuth = await prisma.user.findFirst({
      where: {
         username: username
      }
   })
   return userAuth
}


export {
   getAuthToken,
   getUser
}