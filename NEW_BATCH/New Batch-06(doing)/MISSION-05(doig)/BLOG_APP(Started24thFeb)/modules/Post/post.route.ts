import express, { NextFunction, Request, Response } from "express"
import { postController } from "./post.controller"
import { betterAuth1 } from "../../lib/auth"
import { auth, UserRole } from "../../middlware/auth"

const router = express.Router()

router.get("/", postController.getPost)
router.get("/specific", postController.getSpecificPost)
router.post("/create-post", auth(UserRole.USER), postController.createPost)
export const postRoute = router