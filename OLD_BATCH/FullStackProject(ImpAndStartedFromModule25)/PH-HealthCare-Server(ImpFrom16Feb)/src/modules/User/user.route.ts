import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { UserRole } from '../../../generated/prisma/enums';
import { verifyToken } from '../../helpers/jwtHelpers';
import config from '../../config';
import { auth } from '../../middlewares/auth';
import { fileUploader } from '../../helpers/fileUploaders';
// import multer from 'multer';
// import path from 'node:path';

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



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), "uploads"))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })
const router = express.Router()
router.post("/",
    // auth(UserRole.ADMIN, UserRole.DOCTOR),

    // fileUploader.upload.single("file"),
    userController.createAdminController)

// router.post("/create-doctor", userController.createDoctorController)
export const userRouter = router