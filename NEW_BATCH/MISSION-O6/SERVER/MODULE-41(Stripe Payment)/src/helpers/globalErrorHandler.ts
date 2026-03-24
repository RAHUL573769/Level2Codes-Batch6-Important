import { NextFunction, Request, Response } from "express"
import z from "zod"
import { deleteFromCloudinary } from "../config/cloudinary.js"


interface TErrorSources {
    path: string
    message: string
}

export const globalErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

    const errorSource: TErrorSources[] = []

    // if (err instanceof z.ZodError) {
    //     statusCode=4000
    // }
    if (req.file) {
        await deleteFromCloudinary(req.file.path)
    }
    // if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    //     try {
    //         const results = await Promise.all(
    //             req.files.map(url => deleteFromCloudinary(url as string))
    //         );
    //         console.log("Deleted images:", results);
    //     } catch (error) {
    //         console.error("Error deleting images:", error);
    //     }
    // }
    res.status(500).json({
        success: false,
        message: "Intenal Server Error",
        error: err.message
    })
    next()
}