import { NextFunction, Request, RequestHandler, Response } from "express"

// import pickFunction from "../../shared/pick"
import { adminFilterableFields } from "./admin.constants"

import { successResponse } from "../../helpers/errorResponse"
import { catchAsync } from "../../shared/catchAsync"
import { AdminServices1 } from "./admin.service"
import pickFunction from "../../shared/pick"

const sendResponse = <T>(res: Response, jsonData: {
    statusCode: number,
    success: boolean,
    message: string,
    meta?: {
        page: number,
        limit: number,
        total: number
    },
    data: T | null | undefined
}) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        message: jsonData.message,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined
    })
}

// const catchAsync = (parameter: RequestHandler) => {

//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             await parameter(req, res, next)

//         } catch (error) {
//             next(error)
//         }
//     }
// }


const getAllFromDB: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pickFunction(req.query, adminFilterableFields);
    const options = pickFunction(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options)
    const result = await AdminServices1.getAllFromDB(filters, options)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin data fetched!",
        meta: result.meta,
        data: result.data
    })
})

// const getAdminData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // try {

//     const data1 = req.query
//     console.log('data1', data1)
//     const filters = pickFunction(data1, adminFilterableFields)
//     const optionsPagination = pickFunction(data1, ['limit', "page"])
//     // const tags = req.query.tags ? (req.query.tags as string).split(",") : []
//     console.log('', optionsPagination)
//     //Type Checking
//     // const searchString = typeof data1 === "string" ? data1 : undefined;
//     //Type Checking
//     const data = await AdminServices1.getAdminDataFromDb(filters, optionsPagination)
//     // res.status(200).json({
//     //     message: "Admin Fetches",
//     //     status: true,
//     //     data: data
//     // })
//     successResponse(res, {
//         statusCode: 200,
//         message: "Admin Fetches",
//         status: true,
//         data: data
//     })

//     // } catch (error) {
//     //     next(error)
//     // }
// })
const getSpecificAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.params.id
        console.log(params)
        const result = await AdminServices1.getAdminById(params as string)
        res.status(200).json({
            message: "Admin Fetched",
            status: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

const updateSpecificAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const data = req.body
    try {

        const result = await AdminServices1.updateAdminService(id as string, data)
        res.status(200).json({
            message: "Admin Updated Done",
            status: true,
            data: result,
        })

    } catch (error) {
        next(error)
    }
}
const deleteFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const data = await AdminServices1.deleteFromDb(id as string)
        res.status(200).json({
            data: data
        })

    } catch (error) {
        next(error)
    }
}


export const AdminController = { deleteFromDb, getAllFromDB, getSpecificAdmin, updateSpecificAdmin }