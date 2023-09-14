"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tags_services_js_1 = require("./tags.services.js");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const tags = await (0, tags_services_js_1.getTags)();
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
exports.default = router;
//# sourceMappingURL=tags.controller.js.map