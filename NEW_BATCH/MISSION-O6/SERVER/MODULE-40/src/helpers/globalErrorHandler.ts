import { NextFunction, Request, Response } from "express"
import z from "zod"


interface TErrorSources {
    path: string
    message: string
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const errorSource: TErrorSources[] = []

    // if (err instanceof z.ZodError) {
    //     statusCode=4000
    // }
    res.status(500).json({
        success: false,
        message: "Intenal Server Error",
        error: err.message
    })
    next()
}