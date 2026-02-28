import { NextFunction, Request, RequestHandler, Response } from "express";
import { postService } from "./post.services";

const createPost = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = await postService.createPostIntoDb(req.body)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}
const getPost: RequestHandler = async (req, res) => {
    try {
        const data = await postService.getPostFromDb()
        console.log(data)
        res.status(200).json({ data: data })

    } catch (error) {
        console.log(error)
    }
}
export const postController = { createPost, getPost }