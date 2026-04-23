import { Request, Response } from "express"

export const successResponse = <T>(res: Response, req: Request, jsonData: {
    statusCode: number,
    success: boolean,
    message: string,
    data: T | null | undefined
}) => {

    res.status(jsonData.statusCode).json({
        message: jsonData.message,
        data: jsonData.data
    })
}
