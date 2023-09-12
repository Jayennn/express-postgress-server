import Express, { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getTodo, updateTodo } from "./todo.services";

const router: Router = Express.Router();

type DecodeToken = {
   id: number
   role_id: number,
   username: string,
   iat: number,
   exp: number,
} & JwtPayload

router.get('/', async (req, res) => {
   try {
      const todo = await getTodo()
      res.json({
         todo
      })
   } catch (err) {
      res.json({
         error: err
      })
   }
})

router.put('/:id', async (req, res) => {
   const headers = req.headers['authorization'];
   const { id, task_id } = req.query;

   if (!headers) {
      return res.status(403).json({
         message: "Forbidden"
      })
   }

   try {
      const bearer = headers.split(" ")
      const user = jwt.decode(bearer[1]) as DecodeToken;

      const todo = await updateTodo(
         req.body,
         req.params.id as string,
         task_id as string,
      )

      res.json({
         todo,
         message: "Success update"
      })
   } catch (err) {
      res.json({
         error: err
      })
   }
})

export default router