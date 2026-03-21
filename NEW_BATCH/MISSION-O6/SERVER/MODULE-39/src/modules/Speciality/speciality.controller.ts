


// export interface TResponse<T> {
//     success: boolean;
//     message: string;
//     statusCode: number;
//     data?: T;
// }

import { RequestHandler } from "express"
import { catchAsync1 } from "../../helpers/catchAsunc.js"
import { SpecilityServices } from "./speciality.service.js"
import { sendResponse } from "../../helpers/succesRespose.js"
import status from "http-status"

// const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
//     const { success, message, statusCode, data } = responseData;

//     res.status(statusCode).json({
//         success,
//         message,
//         statusCode,
//         data,
//     });
// };
// const catchAsync = (fn: RequestHandler) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {

//             await fn(req, res, next)

//         } catch (error) {
//             res.status(200).json({
//                 message: "",
//                 status: "Failed",
//                 data: error
//             })
//         }
//     }
// }

const createSpecility: RequestHandler = catchAsync1(async (req, res) => {

    const payload = req.body
    const result = await SpecilityServices.createSpeciality(payload)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Speciality Created"
    })




})
const getSpecility: RequestHandler = async (req, res) => {
    try {
        const result = await SpecilityServices.getSpeciality()
        res.status(status.OK).json({
            message: "Speciality Caeated",
            success: true,
            data: result,

        })


    } catch (error) {
        console.log(error)
    }

}
const deleteSpecility: RequestHandler = catchAsync1(async (req, res) => {

    const { id } = req.params

    const data = await SpecilityServices.deleteSpeciality(id as string)

    res.status(status.OK).json({
        message: "Speciality Deleted",
        success: true,
        data: data
    })




})
export const SpecialityController = { deleteSpecility, getSpecility, createSpecility }