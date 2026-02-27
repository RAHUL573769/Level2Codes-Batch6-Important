import { NextFunction, Request, Response } from "express";
import { postService } from "./post.services";

const createPost = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = await postService.createPostIntoDb()
    } catch (error) {
        console.log(error)
    }
}

export const postController = { createPost }