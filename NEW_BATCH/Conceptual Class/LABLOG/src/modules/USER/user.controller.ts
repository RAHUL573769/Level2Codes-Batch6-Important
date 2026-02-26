import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";


const register: RequestHandler = async (req, res) => {

    const payload = req.body
    const user = await prisma.user.create({
        data: payload,

    })
    res.status(200).json({
        message: "USER CREATED SUCCESSFULLY",
        status: true,
        data: user
    })
}


export const UserController = { register }