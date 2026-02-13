import { NextFunction, Request, Response } from "express"
import { jwtHelpers } from "../helpars/jwthelpers"
import config from "../config"
import { ApiError } from "../errors/ApiError"

export const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        console.log(roles)

        try {
            const token = req.headers.authorization
            console.log(token)
            if (!token) {
                throw new ApiError(400, "rghh")
            }
            const verifiedUser = jwtHelpers.verifyToken(token, config.JWT_SECRET as string)
            console.log("erified User", verifiedUser)
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new Error("You are not authorized");
            }


            next()
        } catch (error) {
            next(error)
        }
    }
}