import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../helpers/jwtHelpers"
import config from "../config"
import { ApiError } from "../errors/errors"


export const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                // throw new Error("You are not Authorized")
                throw new ApiError(400, "Yous")
            }
            const verifiedUser = verifyToken(token as string, config.ACCESS_TOKEN_SECRET as string)
            console.log("VerifiedUser", verifiedUser)
            req.user = verifiedUser
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new Error("YOU are not authorized")
            }
            next()
        } catch (error) {
            next(error)
        }
    }

}
