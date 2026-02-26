import express from "express"
import cors from "cors"
import { userRouter } from "../modules/USER/user.route"
import router1 from "../routes/routes"
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", router1)

export default app