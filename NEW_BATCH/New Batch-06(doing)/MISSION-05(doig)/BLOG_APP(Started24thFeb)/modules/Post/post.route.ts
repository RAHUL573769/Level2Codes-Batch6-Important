import express from "express"
import { postController } from "./post.controller"

const router = express.Router()

router.get("/", postController.getPost)
router.post("/create-post", postController.createPost)
export const postRoute = router