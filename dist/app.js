import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import routes from "./routes/routes.js";
let app = undefined;
const PORT = process.env.PORT || 3001;
app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`listen to ${PORT}`);
});
//# sourceMappingURL=app.js.map