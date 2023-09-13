import Express from "express";
import { getStatus, } from "./status.services.js";
const router = Express.Router();
router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        const status = await getStatus(name);
        res.json({
            data: status,
        });
    }
    catch (err) {
        res.json({
            error: err
        });
    }
});
export default router;
//# sourceMappingURL=status.controller.js.map