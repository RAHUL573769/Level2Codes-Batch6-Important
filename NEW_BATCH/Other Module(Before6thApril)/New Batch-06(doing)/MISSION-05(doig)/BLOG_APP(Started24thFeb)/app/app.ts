import express, { Application, Request, Response } from "express"
import router from "../router/routes";
import { toNodeHandler } from "better-auth/node";
// import { auth } from "../lib/auth";
import cors from "cors"
import config from "../config";
import { betterAuth1 } from "../lib/auth";


const app: Application = express()
app.all("/api/auth/*splat", toNodeHandler(betterAuth1));
app.use(express.json());
app.use(cors({
    origin: config.APP_URL || "http://localhost:4000", credentials: true


}))
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/api/v1", router)


// app.all("/api/auth/*", toNodeHandler(auth));
export default app