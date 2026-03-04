import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";


const pickFunction = <T, K extends keyof T>(obj: T, keys: K[]) => {
    const result = {} as Pick<T, K>;

    if (!obj || !Array.isArray(keys)) {
        return result;
    }

    for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    }

    return result;
};


const validateRequest = (req: Request, res: Response, next: NextFunction) => {



}

export const catchAsync = (fn: RequestHandler) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)

        } catch (error) {
            next(error)
        }
    }
}

export const sendResponse = <T>(res: Response, req: Request, jsonData: {
    statusCode: number,
    success: boolean,
    message: string,
    data: T | null | undefined
}) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        message: jsonData.message,
        data: jsonData.data
    })

}

const createAdminController = catchAsync(async (req: Request, res: Response) => {
    try {

        const data = req.body
        const result = await UserService.createAdmin(data)
        // res.status(200).json({
        //     success: true,
        //     message: "Admin Created Successfully",
        //     data: result
        // })
        sendResponse(res, req, {
            statusCode: 200,
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
})
const getAdminController = async (req: Request, res: Response) => {

    pickFunction(req.query, ["name", "email", "searchTerm"])
    console.log(req.query)
    try {
        const options = pickFunction(req.query, ["limit", "page", "sortBy", "sortOrder"])
        console.log("Options", options)

        const result = await UserService.getAdmin(req.query, options)
        res.status(200).json({
            success: true,
            message: "Admin Fetched Successfully",
            data: result
        })
    } catch (error) {

    }
}
const getAdminByIdController = async (req: Request, res: Response) => {

    try {

        const params = req.params.id
        const result = await UserService.getAdminById(params as string)
        res.status(200).json({
            success: true,
            message: "Single Admin Fetched Successfully",
            data: result
        })

    } catch (error) {
        console.log(error)
    }
}

const updateAdminController = async (req: Request, res: Response) => {
    const id = req.params.id
    const data = req.body
    try {
        const result = await UserService.updateAdmin(id as string, data)
        res.status(200).json({
            success: true,
            message: "Single Admin Updated Successfully",
            data: result
        })
    } catch (error) {
        console.log(error)

    }
}
const deleteFromDb = async () => {

}

export const UserController = { deleteFromDb, updateAdminController, createAdminController, getAdminController, getAdminByIdController }