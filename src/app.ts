import Express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authController from "./controllers/auth/auth.controller";
import tasksController from "./controllers/task/tasks.controller";
import tagsController from "./controllers/tag/tags.controller";
import { cookieJwtAuth } from "./middleware/cookieJwtAuth";
import routes from "./routes/routes";

let app: Express.Application | undefined = undefined;
const PORT = process.env.PORT || 3001;
app = Express();

app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:3000",
   credentials: true   
}))
// for parsing application/json
app.use(Express.json());
// for parsing application/x-www-form-urlencoded
app.use(Express.urlencoded({ extended: true }));

app.use(routes)
// for parsing multipart/form-data
// app.use(upload.array());
// const token = require('crypto').randomBytes(64).toString('hex');
// const server = http.createServer(app)

// app.use('/api/auth', authController)
// app.use('/api/tasks', cookieJwtAuth, tasksController)
// app.use('/api/tags', tagsController)
// app.use('/api/status', )




app.listen(PORT, () => {
   console.log(`listen to ${PORT}`);
});
