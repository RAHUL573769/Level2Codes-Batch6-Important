import express, { Application, Request, Response } from "express"
import router from "../router/routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

const app: Application = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/api/v1", router)
app.all("/api/auth/*", toNodeHandler(auth));
export default app