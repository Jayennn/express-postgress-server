import Express from "express";
import { getTags } from "./tags.services.js";
const router = Express.Router();
router.get("/", async (req, res) => {
    try {
        const tags = await getTags();
        res.json({
            data: tags
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
export default router;
//# sourceMappingURL=tags.controller.js.map