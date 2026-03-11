import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync1 = (fn: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            await fn(req, res, next)

        } catch (error) {
            next(error)
        }
    }
}