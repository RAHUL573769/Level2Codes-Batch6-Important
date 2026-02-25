
import { NextFunction, Request, Response } from "express"
import { userService } from "./user.service"

const createAdminController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("Create Admin")
        console.log('8', req.file)
        console.log(req.body)

        const result = await userService.createAdminService(req)
        // res.send(result)
        res.status(200).json({
            message: "Admin Created Succesfully",
            status: true,
            data: result
        })

    } catch (error: any) {

        // res.status(500).json({
        //     message: "Admin Created Failed",
        //     status: false,
        //     data: error.name
        // })
        next(error)

    }
}

const createDoctorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("Create Admin")
        console.log('33from cotroller', req.body)
        const data = req.body
        const result = await userService.createDoctorService(req.body)
        // res.send(result)
        res.status(200).json({
            message: "Admin Created Succesfully",
            status: true,
            data: result
        })

    } catch (error: any) {

        // res.status(500).json({
        //     message: "Admin Created Failed",
        //     status: false,
        //     data: error.name
        // })
        next(error)

    }
}

export const userController = { createAdminController, createDoctorController }