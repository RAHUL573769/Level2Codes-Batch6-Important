import { Response } from "express"

export const successResponse = <T>(res: Response, jsonData: {
    statusCode: number,
    message: string,
    status: boolean,
    data: T | null | undefined

}) => {
    res.status(jsonData.statusCode).json({
        message: jsonData.message,
        status: jsonData.status,
        data: jsonData.data
    })
}