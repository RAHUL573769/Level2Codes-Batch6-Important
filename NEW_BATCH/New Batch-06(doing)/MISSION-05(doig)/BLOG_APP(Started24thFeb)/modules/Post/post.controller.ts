import { NextFunction, Request, RequestHandler, Response } from "express";
import { postService } from "./post.services";
const parseBoolean = (value: any) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
};


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
// const getPost: RequestHandler = async (req, res) => {
//     try {

//         const search = req.body
//         const searchString = typeof search === "string" ? search : undefined
//         const data = await postService.getPostFromDb({ search: searchString })
//         console.log(data)
//         res.status(200).json({ data: data })

//     } catch (error) {
//         console.log(error)
//     }
// }

const getPost: RequestHandler = async (req, res) => {
    try {

        const data = await postService.getPostFromDb()

        res.status(200).json({ data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getSpecificPost: RequestHandler = async (req, res) => {
    try {
        const { search } = req.query
        // const searchString = req.body.search as string | undefined
        const searchString = typeof search === "string" ? search : undefined
        console.log(searchString)

        const tags = req.query.tags ? (req.query.tags as string).split(",") : []
// const isFeatured = req.query.isFeatured === "true" ? true : false
//truwe of false


        const isFeatured = parseBoolean(req.query.isFeatured) ?? false;
        // const isFeatured = req.query.isFeatured ?
        //     req.query.isFeatured === "true" ? true :
        //         req.query.isFeatured === "false" ? false : undefined
        //     :
        //     undefined
        // const data = await postService.getSpecificPostFromDb({ search: searchString, tags, isFeatured })
        const data = await postService.getSpecificPostFromDb({
            search: searchString,
            tags,
            isFeatured,
        });
        res.status(200).json({ data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}
export const postController = { getSpecificPost, createPost, getPost }