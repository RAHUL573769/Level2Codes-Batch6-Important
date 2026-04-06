import { RequestHandler } from "express"
import { catchAsync1 } from "../../../helpers/catchAsunc"
import { doctorService } from "./doctor.service"
import { sendResponse } from "../../../helpers/succesRespose"

const getDoctorController: RequestHandler = catchAsync1(async (req, res) => {


    const result = await doctorService.getDoctorsService()
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Doctor Fetched"
    })




})


export const doctorController = { getDoctorController }