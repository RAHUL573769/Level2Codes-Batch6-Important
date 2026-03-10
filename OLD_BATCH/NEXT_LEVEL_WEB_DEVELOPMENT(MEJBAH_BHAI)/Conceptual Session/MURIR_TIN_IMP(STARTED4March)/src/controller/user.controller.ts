import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/user.service";
import status from "http-status";



const successResponse = <T>(res: Response, req: Request, jsonData: {
    statusCode: number,
    success: boolean,
    message: string,
    data: T | null | undefined
}) => {

    res.status(jsonData.statusCode).json({
        message: jsonData.message,
        data: jsonData.data
    })
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userData = req.body;

        const result = await UserService.createUserServices(userData)
        // const result = await User.create(userData)
        // res.status(200).json({
        //     message: "User Ceated",
        //     data: result
        // })
        successResponse(res, req, {
            statusCode: status.OK,
            message: "User Data Created",
            success: true,
            data: result
        })

    } catch (error: any) {
        // res.status(500).json({
        //     status: "fail",
        //     messsage: error.message || "Error Found"
        // })
        next(error)
    }
}


const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await UserService.getUsersServices()
        res.status(200).json({
            message: "User Fetched",
            data: data
        })
    } catch (error) {
        console.log(error)
    }

}

export const UserController = { createUser, getUser }