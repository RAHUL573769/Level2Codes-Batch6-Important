import { Request, Response, NextFunction } from "express";
import status from "http-status";
export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const statusCode = err.statusCode || 500;

    res.status(status.INTERNAL_SERVER_ERROR).json({
        status: "fail",
        message: err.message || "Internal Server Error"
    });
};

export default globalErrorHandler;