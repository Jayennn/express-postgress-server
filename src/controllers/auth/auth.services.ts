import { Prisma } from "@prisma/client";
import prisma from "../../database";
import jwt from 'jsonwebtoken';

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