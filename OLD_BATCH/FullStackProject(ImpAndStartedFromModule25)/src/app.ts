import express, { Application } from 'express'
import cors from "cors"
import { UserRoute } from './app/modules/User/user'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/users", UserRoute)
export default app


