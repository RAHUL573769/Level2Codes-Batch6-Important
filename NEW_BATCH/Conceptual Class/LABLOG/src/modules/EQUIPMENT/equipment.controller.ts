import { RequestHandler, Response, Request } from "express";
import { prisma } from "../../lib/prisma";

const createEquipment: RequestHandler = async (req, res) => {

    try {
        const payload = req.body
        const result = await prisma.equipment.create({
            data: payload
        })
        res.status(200).json({
            data: result
        })

    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

const getEquipment = async (req: Request, res: Response,) => {
    try {
        const result = await prisma.equipment.findMany()
        res.status(200).json({
            data: result
        })


    } catch (error) {
        console.log(error)

    }
}
export const equipmentController = { createEquipment, getEquipment }