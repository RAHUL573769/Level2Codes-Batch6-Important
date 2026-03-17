import express from 'express';
import { SpecialityRoute } from '../../modules/Speciality/speciality.route';
import { AuthRoute } from '../../betterAuth/auth.route';
const router = express.Router()

const allRouter = [
    {
        path: "/specialties",
        routes: SpecialityRoute
    },
    {
        path: "/auth",
        routes: AuthRoute,
    }]

allRouter.forEach(singleRouter => router.use(singleRouter.path, singleRouter.routes))


export default router