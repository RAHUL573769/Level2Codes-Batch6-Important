import { NextFunction, Request, Response } from "express"
import status from "http-status"

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({
        err: {
            path: req.originalUrl,
            message: "Your PaTH doesnot exists"
        }
    })
}