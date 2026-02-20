import { NextFunction, Request, Response } from "express"

export const globalErrorHandlers = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Eror occurred")
    res.status(400).json({
        success: false,
        message: err.name,
        error: err
    })
}