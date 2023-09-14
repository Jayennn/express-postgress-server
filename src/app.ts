import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import routes from "./routes/routes";

let app: express.Application | undefined = undefined;
const PORT = process.env.PORT || 3001;
app = express();

app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes)
app.get("/", async (req, res) => {
   res.send("helloww")
})

app.listen(PORT, () => {
   console.log(`listen to ${PORT}`);
});

export default app;