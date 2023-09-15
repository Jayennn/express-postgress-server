import Express, { Router, NextFunction, Request, Response } from "express";
import { AuthenticatedRequest, cookieJwtAuth } from "../../middleware/cookieJwtAuth";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "./tasks.services";
import jwt, { JwtPayload } from "jsonwebtoken";
const router: Router = Express.Router();

type DecodeToken = {
   id: number
   role_id: number,
   username: string,
   iat: number,
   exp: number,
} & JwtPayload


router.post("/",  async (req: AuthenticatedRequest, res: Response,) => {
   const headers = req.headers['authorization'];
   const { title, description, tag_id, todo } = req.body;

   if (!headers) {
      return res.status(403).json({
         message: "Forbidden"
      })
   }

   try {

      const bearer = headers.split(" ")
      const user = jwt.decode(bearer[1]) as DecodeToken


      const tasks = await createTask(
         title,
         description,
         tag_id,
         user.id,
         todo
      );

      res.json({
         task: tasks
      })
   } catch (err) {
      res.json({
         error: "error"
      })
   }
})

router.get('/',  async (req, res) => {
   const headers = req.headers['authorization'];
   const { title } = req.query;

   if (!headers) {
      return res.status(403).json({
         message: "Forbidden"
      })
   }

   try {
      const bearer = headers.split(" ")
      const user = jwt.decode(bearer[1]) as DecodeToken;


      const tasks = await getTasks({
         user_id: user.id,
         title: title as string
      })

      res.json({
         tasks: tasks
      })

   } catch (err) {
      res.json({
         error: err.message
      })
   }
})

router.get('/:id',  async (req: Request, res: Response, next: NextFunction) => {
   const headers = req.headers['authorization'];
   
   if (!headers) {
      return res.status(403).json({
         message: "Forbidden"
      })
   }

   try {

      const bearer = headers.split(" ")
      const user = jwt.decode(bearer[1]) as DecodeToken;

      const tasks = await getTaskById(
         req.params.id,
         user.id
      )

      res.json({
         tasks
      })

   } catch (error) {
      next(error);
   }
})

router.put('/:id',  async (req: Request, res: Response, next: NextFunction) => {
   console.log({
      bodyTask: req.body,
      param: req.params.id,
   });

   const headers = req.headers['authorization'];
   if (!headers) {
      return res.status(403).json({
         message: "Forbidden"
      })
   }

   try {

      const bearer = headers.split(" ")
      const user = jwt.decode(bearer[1]) as DecodeToken;

      const tasks = await updateTask(
         req.body,
         req.params.id,
         user.id
      )

      res.json({
         tasks,
         message: "success update"
      })

   } catch (error) {
      next(error);
   }
})

router.delete('/:id', async (req: Request, res: Response) => {
   const headers = req.headers['authorization'];
   if (!headers) {
      return res.status(403).json({
         message: "Forbidden"
      })
   }

   try {

      const bearer = headers.split(" ")
      const user = jwt.decode(bearer[1]) as DecodeToken;

      await deleteTask(req.params.id, user.id)

      res.json({
         message: "Success delete task"
      })

   } catch (error) {
      res.json({
         message: error
      })
   }
})

export default router;
