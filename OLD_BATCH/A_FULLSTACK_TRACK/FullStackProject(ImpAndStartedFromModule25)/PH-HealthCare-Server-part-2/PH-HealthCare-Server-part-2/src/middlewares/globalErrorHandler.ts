import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {


    res.status(400).json({
        success: "false",
        error: err
    })

}