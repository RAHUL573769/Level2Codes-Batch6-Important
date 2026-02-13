import { Request, Response } from "express";
import { catchAsync } from "../Admin/admin.controller";
import { loginUserSerice } from "./auth.service";

const loginUserControllerCode = catchAsync(async (req: Request, res: Response) => {
    const auth = await loginUserSerice.loginUser(req.body)
    res.status(200).json({
        data: auth
    })
})

export default loginUserControllerCode