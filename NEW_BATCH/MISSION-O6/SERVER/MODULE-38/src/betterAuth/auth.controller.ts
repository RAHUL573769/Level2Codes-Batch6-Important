import { NextFunction, Request, Response } from "express";
import { catchAsync1 } from "../helpers/catchAsunc";

import { AuthService } from "./auth.service";
import { sendResponse } from "../helpers/succesRespose";
import { jwtHelpers } from "../jwtTokenCreation/jwt";
import { setAccessToken, setBetterAuthSession, setRefreshToken } from '../jwtTokenCreation/accessToke';


const registerPatient = catchAsync1(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        console.log(payload)
        const result = await AuthService.registerPatient(payload)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            data: result,
            message: "Patient Registerd"
        })
    }
)


const loginUser = catchAsync1(async (req: Request, res: Response) => {

    const payload = req.body
    const result = await AuthService.loginUser(payload)
    const { accessToken, refreshToken, token, ...rest } = result
    setAccessToken(res, accessToken)
    setRefreshToken(res, refreshToken)
    setBetterAuthSession(res, token)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Usrr Logged In",
        data: result
    })
})


export const AuthController = { registerPatient, loginUser }