
import { Request, Response } from "express"
import { userService } from "./user.service"

const createAdminController = async (req: Request, res: Response) => {
    // console.log("Create Admin")
    const result = await userService.createAdminService()
    res.send(result)
}

export const userController = { createAdminController }