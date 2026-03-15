import express from 'express';
import { SpecialityRoute } from '../../modules/Speciality/speciality.route';
const router = express.Router()

const allRouter = [
    {
        path: "/specialties",
        routes: SpecialityRoute
    }
]

allRouter.forEach(singleRouter => router.use(singleRouter.path, singleRouter.routes))


export default router