import { RequestHandler } from "express"
import { sendResponse } from "../../helpers/succesRespose"
import { catchAsync1 } from "../../helpers/catchAsunc"
import { userService } from "./user.service"

const createDoctorController: RequestHandler = catchAsync1(async (req, res) => {

    const payload = req.body
    const result = await userService.createDoctor(payload)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Doctor Created"
    })




})

export const userServiceController1 = { createDoctorController }