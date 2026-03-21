import express, { NextFunction, Request, Response } from 'express';
import { SpecialityController } from './speciality.controller';
import { cookieUtils } from '../../jwtTokenCreation/cookies';
import { jwtHelpers } from '../../jwtTokenCreation/jwt';
import config from '../../config';


const router = express.Router()

router.post("/create-specialties", SpecialityController.createSpecility)
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