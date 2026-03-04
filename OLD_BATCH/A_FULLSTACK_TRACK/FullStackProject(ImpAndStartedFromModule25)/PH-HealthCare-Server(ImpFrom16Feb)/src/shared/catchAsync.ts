import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync = (parameter: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await parameter(req, res, next)

        } catch (error) {
            next(error)
        }
    }
}
