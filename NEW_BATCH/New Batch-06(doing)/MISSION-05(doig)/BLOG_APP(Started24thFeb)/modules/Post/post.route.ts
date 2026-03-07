import express, { NextFunction, Request, Response } from "express"
import { postController } from "./post.controller"
import { betterAuth1 } from "../../lib/auth"

const router = express.Router()


const auth = (...roles: any) => {
    console.log(roles)
    return async (req: Request, res: Response, next: NextFunction) => {


        const session = await betterAuth1.api.getSession({
            headers: req.headers as any
        })
        console.log(session)
        next()
    }
}
router.get("/", postController.getPost)
router.get("/specific", postController.getSpecificPost)
router.post("/create-post", auth("USER"), postController.createPost)
export const postRoute = router