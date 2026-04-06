import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync1 = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)

        } catch (error) {
            next(error)
            // res.status(200).json({
            //     message: "",
            //     status: "Failed",
            //     data: error
            // })
        }
    }
}