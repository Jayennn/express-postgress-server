"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const routes_js_1 = __importDefault(require("./routes/routes.js"));
let app = undefined;
const PORT = process.env.PORT || 3001;
app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(routes_js_1.default);
app.get("/", async (req, res) => {
    res.send("helloww");
});
app.listen(PORT, () => {
    console.log(`listen to ${PORT}`);
});
//# sourceMappingURL=app.js.map