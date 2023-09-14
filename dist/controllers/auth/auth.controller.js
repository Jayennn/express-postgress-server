"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_services_js_1 = require("./auth.services.js");
const cookieJwtAuth_js_1 = require("../../middleware/cookieJwtAuth.js");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
function generateAccessToken(id, username, role_id) {
    if (!process.env.SECRET_KEY) {
        return "";
    }
    const payload = {
        id: id,
        username: username,
        role_id: role_id,
    };
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
}
router.get('/', cookieJwtAuth_js_1.cookieJwtAuth, (req, res) => {
    console.log(req.cookies.token);
    const decode = jsonwebtoken_1.default.decode(req.cookies.token);
    if (decode) {
        console.log({
            id: decode.id,
            role_id: decode.role_id,
            username: decode.username
        });
    }
});
router.post("/", upload.any(), async (req, res) => {
    const { username, password } = req.body;
    const user = await (0, auth_services_js_1.getAuthToken)(username);
    if (user?.password !== password || user?.username !== username) {
        return res.status(403).json({
            error: "invalid login"
        });
    }
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    try {
        const token = generateAccessToken(user.id, user.username, user.role_id);
        // res.setHeader('Set-Cookie', token)
        res.status(200).json({
            data: {
                id: user.id,
                username: user.username,
                role_id: user.role_id,
                token: token
            },
            message: "success"
        });
    }
    catch (error) {
        console.error("Error occurred during authentication:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
//# sourceMappingURL=auth.controller.js.map