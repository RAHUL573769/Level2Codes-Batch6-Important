import express, { Application, Request, Response } from 'express'
import cors from "cors"
import { UserRouter } from './modules/User/user.route'
// import UserRouter from './modules/User/user.route';
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1", UserRouter)
app.get("/", (req: Request, res: Response) => {
    res.send("Get Done")
})
export default app