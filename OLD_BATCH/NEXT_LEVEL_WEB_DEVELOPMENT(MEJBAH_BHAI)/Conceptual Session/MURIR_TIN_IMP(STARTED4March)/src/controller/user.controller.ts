import { Request, Response } from "express";
import User from "../model/user.model";

const createUser = async (req: Request, res: Response) => {

    try {
        const userData = req.body;
        const result = await User.create(userData)
        res.status(200).json({
            message: "User Ceated",
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            status: "fail",
            messsage: error.message || "Error Found"
        })

    }
}

export const UserController = { createUser }