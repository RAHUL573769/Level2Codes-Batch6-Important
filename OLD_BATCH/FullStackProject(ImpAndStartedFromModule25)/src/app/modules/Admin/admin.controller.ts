import { Request, Response } from "express"
import { AdminService } from "./admin.service"


const getAdmin = async (req: Request, res: Response) => {

    console.log(req.query)
    const result = await AdminService.getAdminFromDb(req.query)
    res.status(200).json({
        success: "",
        message: "Admin Fetched",
        data: result
    })


}


export const AdminController = { getAdmin }