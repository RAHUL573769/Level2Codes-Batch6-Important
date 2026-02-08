import express, { Application } from 'express'
import cors from "cors"
import { UserRoute } from './app/modules/User/user'
import { AdminRoute } from './app/modules/Admin/admin.route'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/users", UserRoute)

app.use("/api/v1/admin", AdminRoute)


export default app


