import express from "express"
import { postController } from "./post.controller"

const router = express.Router()

router.post("/create-post", postController.createPost)
export const postRoute = router