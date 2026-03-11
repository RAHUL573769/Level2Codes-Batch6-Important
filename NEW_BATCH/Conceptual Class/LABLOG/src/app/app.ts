import express from "express"
import cors from "cors"
import { userRouter } from "../modules/USER/user.route"
import router1 from "../routes/routes"
import { toNodeHandler } from "better-auth/node"
import { betterAuth1 } from "../lib/auth"
import config from "../config"
const app = express()


// app.all("/api/auth/*", toNodeHandler(auth));

app.all("/api/auth/*splat", toNodeHandler(betterAuth1));

app.use(express.json())
// app.use(cors())
app.use(
    cors({
        origin: config.FRONTEND_URL,
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
);
app.use("/api/v1", router1)

export default app