import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { LoginUserService } from "./auth.service";

const loginController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await LoginUserService.loginUserService(req.body);

            const { refreshToken } = result;
            console.log("Refresh Token", refreshToken)
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
const changePassword = catchAsync(async (req: Request, res: Response) => {
    console.log("Req-User")

})
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies
        console.log('32', refreshToken)
        next()

    } catch (error) {
        console.log(error)
    }
}
const forgotPassword = () => { }
const resetPassword = () => { }

export const LoginController = { resetPassword, forgotPassword, loginController, changePassword, refreshToken }