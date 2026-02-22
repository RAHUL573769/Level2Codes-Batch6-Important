import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { UserRole } from '../../../generated/prisma/enums';
import { verifyToken } from '../../helpers/jwtHelpers';
import config from '../../config';
import { auth } from '../../middlewares/auth';


// const auth = (...roles: string[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const token = req.headers.authorization
//             if (!token) {
//                 throw new Error("You are not Authorized")
//             }
//             const verifiedUser = verifyToken(token as string, config.ACCESS_TOKEN_SECRET as string)
//             console.log("VerifiedUser", verifiedUser)

//             if (roles.length && !roles.includes(verifiedUser.role)) {
//                 throw new Error("YOU are not authorized")
//             }
//             next()
//         } catch (error) {
//             next(error)
//         }
//     }

// }

const router = express.Router()
router.post("/", auth(UserRole.ADMIN, UserRole.DOCTOR), userController.createAdminController)

export const userRouter = router