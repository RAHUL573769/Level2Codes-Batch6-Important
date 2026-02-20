import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { LoginUserService } from "./auth.service";

const loginController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await LoginUserService.loginUserService(req.body);

            const { refreshToken } = result;
            // console.log("Refresh Token", refreshToken)
            res.cookie("RefreshToken", refreshToken, {
                secure: false,
                httpOnly: true
            })
            res.status(200).json({
                message: "Login Successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
);

export const LoginController = { loginController }