import express from "express"
import cors from "cors"
import { userRouter } from "../modules/USER/user.route"
import { toNodeHandler } from "better-auth/node"
import config from "../config"
import router1 from "../routes/routes"
import { auth } from "../lib/auth"
const app = express();

app.use(
    cors({
        origin: config.FRONTEND_URL,
        credentials: true,
    })
);
// For ExpressJS v4
app.all("/api/auth/*splat", toNodeHandler(auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.use("/api/v1", router1);

export default app;