import { Request, Response } from "express";
import { userService } from "./user.service";
// import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {

    const result = await userService.createAdmin(req.body)
    try {
        res.status(200).json({
            message: "Created Succesfully",
            status: true,
            data: result
        })

    } catch (error) {
        res.status(200).json({
            message: "Created Faled",
            status: false,
            error: "CeatioonFailed"
        })

    }
}

export const createAdminController = { createAdmin }