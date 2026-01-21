import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdminController = async (req: Request, res: Response) => {
    try {

        const data = req.body
        const result = await UserService.createAdmin(data)
        res.status(200).json({
            success: true,
            message: "Admin Created Successfully",
            data: result
        })
        // return result

    } catch (error: any) {
        res.status(400).json({
            success: true,
            message: "Admin Created Failed Successfully",
            error: error?.message
        })
    }
}

export const UserController = { createAdminController }