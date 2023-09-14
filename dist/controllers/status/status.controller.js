"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const status_services_js_1 = require("./status.services.js");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        const status = await (0, status_services_js_1.getStatus)(name);
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
exports.default = router;
//# sourceMappingURL=status.controller.js.map