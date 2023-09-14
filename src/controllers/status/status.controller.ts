import Express, { Router } from "express";
import {
   getStatus,
} from "./status.services";
const router: Router = Express.Router();

router.get("/", async (req, res) => {
   const { name } = req.query;

   try {

      const status = await getStatus(
         name as string,
      );
      res.json({
         data: status,
      })

   } catch (err) {
      res.json({
         error: err
      })
   }
})


export default router;