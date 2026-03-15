import { RequestHandler } from "express"
import status from "http-status"



const createSpecility: RequestHandler = async (req, res) => {
    try {
        const payload = req.body
        res.status(status.OK).json({
            message: "Speciality Caeated",
            success: true,
            data: payload
        })


    } catch (error) {
        console.log(error)
    }

}

export const SpecialityController = { createSpecility }