import Express, { Router } from "express";
import { getTags } from "./tags.services";
const router: Router = Express.Router();


router.get("/", async (req, res) => {
   try {
      const tags = await getTags();
      res.json({
         data: tags
      })
   } catch (err) {
      res.json({
         error: err
      })
   }
})

export default router;