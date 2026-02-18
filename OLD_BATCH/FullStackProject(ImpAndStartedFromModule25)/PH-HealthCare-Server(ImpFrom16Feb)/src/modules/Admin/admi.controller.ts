import { Request, Response } from "express"
import { AdminServices } from "./admin.service"


const pickFunction = () => { }

const getAdminData = async (req: Request, res: Response) => {
    try {

        const data1 = req.query

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

export const AdminController = { getAdminData }