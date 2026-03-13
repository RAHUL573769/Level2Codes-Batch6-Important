import express, { NextFunction, Request, Response } from "express"
import { betterAuth1 } from "../../lib/auth"
import { auth, UserRole } from "../../middlware/auth"
import { postController } from "./post.controller"

const router = express.Router()

router.get("/", postController.getPost)
router.get("/specific", postController.getSpecificPost)
router.post("/create-post",
    // auth(UserRole.USER),
    postController.createPost)
export const postRoute = router