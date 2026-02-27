import express, { Application, Request, Response } from "express"
import router from "../router/routes";

const app: Application = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/api/v1", router)
export default app