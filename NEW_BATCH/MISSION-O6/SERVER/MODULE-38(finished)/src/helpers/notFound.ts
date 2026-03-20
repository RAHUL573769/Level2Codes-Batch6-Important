import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: `${req.originalUrl} doesnot exists`

    })
}