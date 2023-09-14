"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieJwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieJwtAuth = (req, res, next) => {
    try {
        if (process.env.SECRET_KEY) {
            const header = req.headers['authorization'];
            console.log("test", header);
            if (typeof header !== 'undefined') {
                const bearer = header.split(' ');
                const authToken = bearer[1];
                jsonwebtoken_1.default.verify(authToken, process.env.SECRET_KEY, (err, payload) => {
                    if (err) {
                        return res.status(403).json({
                            message: err
                        });
                    }
                    req.payload = payload;
                    next();
                });
            }
            else {
                res.sendStatus(403);
            }
        }
        else {
            res.status(500).json({
                error: "Internal server error"
            });
        }
    }
    catch (err) {
        res.clearCookie('token');
        res.redirect("/");
    }
};
exports.cookieJwtAuth = cookieJwtAuth;
//# sourceMappingURL=cookieJwtAuth.js.map