import { Response } from "express";
import { TResponse } from "../types/successesponseType.js";


// export interface TResponse<T> {
//     success: boolean;
//     message: string;
//     statusCode: number;
//     data?: T;
// }

export const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
    const { success, message, statusCode, data } = responseData;

    res.status(statusCode).json({
        success,
        message,
        statusCode,
        data,
    });
};