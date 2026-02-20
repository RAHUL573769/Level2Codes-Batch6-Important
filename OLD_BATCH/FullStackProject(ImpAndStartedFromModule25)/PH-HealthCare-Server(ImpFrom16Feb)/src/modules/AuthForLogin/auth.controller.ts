import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { LoginUserService } from "./auth.service";

const loginController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await LoginUserService.loginUserService()
    res.status(200).json({
        message: "Login Sucesfully",
        data: result
    })
})

export const LoginController = { loginController }