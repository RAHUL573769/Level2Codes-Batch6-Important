import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { LoginUserService } from "./auth.service";
import { date } from "zod/v4";

const loginController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await LoginUserService.loginUserService(req.body);

            const { refreshToken } = result;
            // console.log("Refresh Token", refreshToken)
            res.cookie("refreshToken", refreshToken, {
                secure: false,
                httpOnly: false
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
const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Req-User From AuthController", req.user)

        const user = req.user
        const result = await LoginUserService.changePasswordService(user, req.body)
        res.status(200).json({
            message: "Password Changed Successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }
})
const refreshToken = async (req: Request, res: Response) => {
    try {
        // const { refreshToken } = req.cookies
        console.log('32', req.cookies)


    } catch (error) {
        console.log(error)
    }
}
const resetPassword = async (req: Request, res: Response) => {

}
const forgotPassword = () => { }


export const LoginController = { resetPassword, forgotPassword, loginController, changePassword, refreshToken }