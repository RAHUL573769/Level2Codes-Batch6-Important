import express, { Request, Response, NextFunction } from "express";
import { userController } from "./user.controller";
import { z, ZodSchema } from "zod";
import { jwtHelpers } from "../../../helpars/jwthelpers";
import config from "../../../config";
import { UserRole } from "../../../../generated/prisma/enums";
import { auth } from "../../../middlewares/auth.middleware";

const router = express.Router();

const update = z.object({
    name: z.string(),
    contactNumber: z.string()
});

const validateRequest = (schema: ZodSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            });
            // await schema.parseAsync(req.body);

            next();
        } catch (error) {
            next(error);
        }
    };


// const auth = (...roles: string[]) => {
//     return async (req: Request, res: Response, next: NextFunction) => {

//         console.log(roles)

//         try {
//             const token = req.headers.authorization
//             console.log(token)
//             if (!token) {
//                 throw new Error("")
//             }
//             const verifiedUser = jwtHelpers.verifyToken(token, config.JWT_SECRET as string)
//             console.log("erified User", verifiedUser)
//             if (roles.length && !roles.includes(verifiedUser.role)) {
//                 throw new Error("You are not authorized");
//             }


//             next()
//         } catch (error) {
//             next(error)
//         }
//     }
// }

router.post("/", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userController.createAdmin);

export const userRoutes = router;
