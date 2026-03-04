
import { NextFunction, Request, Response } from "express"
import { userService } from "./user.service"
import { catchAsync } from "../../shared/catchAsync"
import pickFunction from "../../shared/pick"
import { userFilterableFields } from "./user.constants"
import { successResponse } from "../../helpers/errorResponse"

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
        const result = await userService.createDoctorService(req)
        // res.send(result)
        res.status(200).json({
            message: "Doctor Created Succesfully",
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


const getAdminData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // try {

    const data1 = req.query
    pickFunction(data1, userFilterableFields)
    // const tags = req.query.tags ? (req.query.tags as string).split(",") : []
    console.log(data1)
    //Type Checking
    // const searchString = typeof data1 === "string" ? data1 : undefined;
    //Type Checking
    const data = await userService.getAdminDataFromDb(data1)
    // res.status(200).json({
    //     message: "Admin Fetches",
    //     status: true,
    //     data: data
    // })
    successResponse(res, {
        statusCode: 200,
        message: "User Fetches",
        status: true,
        data: data
    })

    // } catch (error) {
    //     next(error)
    // }
})

export const userController = { getAdminData, createAdminController, createDoctorController }