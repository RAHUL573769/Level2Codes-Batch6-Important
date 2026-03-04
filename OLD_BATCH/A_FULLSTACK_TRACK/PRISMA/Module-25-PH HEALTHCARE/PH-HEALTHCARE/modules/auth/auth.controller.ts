import { Request, Response } from "express";
import { catchAsync, sendResponse } from "../User/user.controller";
import { loginUserService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {

    const result = await loginUserService.loginUser(req.body)
    sendResponse(res, req, {
        statusCode: 200,
        success: true,
        message: "Logged In",
        data: result
    })
})

export const authController = { loginUser }