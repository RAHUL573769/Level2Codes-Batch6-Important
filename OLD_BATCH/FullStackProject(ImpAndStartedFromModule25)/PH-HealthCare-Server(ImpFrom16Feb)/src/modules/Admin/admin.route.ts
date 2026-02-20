import express, { NextFunction, Request, Response } from 'express';
import { AdminController } from './admi.controller';
import z from 'zod';
import { object } from './../../../node_modules/zod/v4/classic/schemas';
import { AnyZodObject } from 'zod/v3';
import { update, validateRequest } from '../../middlewares/catchAsync';
// import { AnyZodObject } from 'zod';



const router = express.Router()


// const update = z.object({
//     body: z.object({
//         name: z.string().optional(),
//         contactNumber: z.string().optional()
//     })
// });

// const validateRequest = (schema: z.ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {


//     try {
//         // await schema.parseAsync(req.body)
//         await schema.parseAsync({
//             body: req.body
//         })
//         return next()

//     } catch (error) {
//         next(error)
//     }
// };



// const validateRequest = (req: Request, res: Response, next: NextFunction) => {

//     console.log(req.body)
//     next()
// }

router.get("/", AdminController.getAdminData)
router.get("/:id", AdminController.getSpecificAdmin)
router.patch("/:id", validateRequest(update), AdminController.updateSpecificAdmin)
router.delete("/:id", AdminController.deleteFromDb)
export const AdminRouter = router