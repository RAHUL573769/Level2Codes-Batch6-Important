import express from "express"
import { postRoute } from "../modules/Post/post.route"

const router = express.Router()

const allRouter = [
    {
        path: "/posts",
        route: postRoute


    }
]


allRouter.forEach(route => router.use(route.path, route.route))

export default router