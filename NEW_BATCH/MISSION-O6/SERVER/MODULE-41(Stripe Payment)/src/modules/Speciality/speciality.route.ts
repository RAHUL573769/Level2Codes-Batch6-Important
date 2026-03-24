import express from 'express';
import { SpecialityController } from './speciality.controller.js';
import { multerUpload } from '../../config/multer.js';
import { validateRequest } from '../../helpers/validateRequestZod.js';
import { SpecialtyValidation } from './speciality.validations.js';



const router = express.Router()

router.post("/create-specialties",

    multerUpload.single("file"),
    validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
    SpecialityController.createSpecility)
router.get("/get-specialties",
    // (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const accessToken = cookieUtils.getCookies(req, "accessToken")

    //         if (!accessToken) {
    //             throw new Error("Unauthorixzed")
    //         }
    //         const verifiedToken = jwtHelpers.verifyToken(accessToken, config.ACCESS_TOKEN_SECRET as string)

    //         if (!verifiedToken.success) {
    //             throw new Error("Unauthorixzed")
    //         }


    //     } catch (error) {
    //         next(error)
    //     }
    // },


    SpecialityController.getSpecility)
router.delete("/:id", SpecialityController.deleteSpecility)


export const SpecialityRoute = router