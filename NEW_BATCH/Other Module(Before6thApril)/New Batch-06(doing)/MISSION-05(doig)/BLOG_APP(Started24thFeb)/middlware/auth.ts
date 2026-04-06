import { NextFunction, Request, Response } from "express"
import { betterAuth1 } from "../lib/auth"

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                email: string,
                role: string,
                emailVerified: boolean
            }
        }
    }
}
export const auth = (...roles: UserRole[]) => {
    console.log(roles)

    return async (req: Request, res: Response, next: NextFunction) => {

        console.log(req.headers)
        const session = await betterAuth1.api.getSession({
            headers: req.headers as any
        })
        console.log(session)


        if (!session) {
            return res.status(400).json({
                success: false,
                message: "You are not authorized",
            })
        }
        if (!session.user.emailVerified) {
            return res.status(403).json({
                success: false,
                message: "Em,sail required",
            })
        }
        req.user = {
            id: session.user.id,
            email: session.user.email,
            role: session.user.role as string,
            emailVerified: session.user.emailVerified
        }

        if (roles.length && !roles.includes(req.user.role as UserRole)) {
            return res.status(403).json({
                success: false,
                message: "You have no permissions",
            })
        }
        next()
    }
}