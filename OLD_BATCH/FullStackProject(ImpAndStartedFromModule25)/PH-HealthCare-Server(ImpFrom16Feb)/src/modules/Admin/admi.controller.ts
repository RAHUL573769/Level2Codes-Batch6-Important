import { Request, Response } from "express"
import { AdminServices } from "./admin.service"
import pickFunction from "../../../shared/pick"
import { adminFilterableFields } from "./admin.constants"



const getAdminData = async (req: Request, res: Response) => {
    try {

        const data1 = req.query
        pickFunction(data1, adminFilterableFields)
        // const tags = req.query.tags ? (req.query.tags as string).split(",") : []
        console.log(data1)
        //Type Checking
        // const searchString = typeof data1 === "string" ? data1 : undefined;
        //Type Checking
        const data = await AdminServices.getAdminDataFromDb(data1)
        res.status(200).json({
            message: "Admin Fetches",
            status: true,
            data: data
        })

    } catch (error) {
        console.log(error)
    }
}
const getSpecificAdmin = async (req: Request, res: Response) => {
    try {
        const params = req.params.id
        console.log(params)
        const result = await AdminServices.getAdminById(params as string)
        res.status(200).json({
            message: "Admin Fetches",
            status: true,
            data: result,
        })
    } catch (error) {

    }
}

const updateSpecificAdmin = async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    try {

        const result = await AdminServices.updateAdminService(id as string, data)
        res.status(200).json({
            message: "Admin Updated Done",
            status: true,
            data: result,
        })

    } catch (error) {
        console.log(error)
    }
}
const deleteFromDb = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = await AdminServices.deleteFromDb(id as string)
        res.status(200).json({
            data: data
        })

    } catch (error) {
        console.log(error)
    }
}


export const AdminController = { deleteFromDb, getAdminData, getSpecificAdmin, updateSpecificAdmin }