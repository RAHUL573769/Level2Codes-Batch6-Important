import { Request, Response } from "express"
import { AdminService } from "./admin.service"
import { adminFilterableFields, pick } from "../../../shared/pick";


const getAdmin = async (req: Request, res: Response) => {

    console.log(req.query)
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    console.log(options)
    const result = await AdminService.getAllFromDB(filters, options)
    res.status(200).json({
        success: "",
        message: "Admin Fetched",
        data: result
    })


}


export const AdminController = { getAdmin }