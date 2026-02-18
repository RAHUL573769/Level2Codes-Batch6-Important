
import { Request, Response } from "express"
import { userService } from "./user.service"

const createAdminController = async (req: Request, res: Response) => {
    try {
        // console.log("Create Admin")
        // console.log(req.body)
        const data = req.body
        const result = await userService.createAdminService(data)
        // res.send(result)
        res.status(200).json({
            message: "Admin Created Succesfully",
            status: true,
            data: result
        })

    } catch (error: any) {

        res.status(500).json({
            message: "Admin Created Failed",
            status: false,
            data: error.name
        })

    }
}

export const userController = { createAdminController }