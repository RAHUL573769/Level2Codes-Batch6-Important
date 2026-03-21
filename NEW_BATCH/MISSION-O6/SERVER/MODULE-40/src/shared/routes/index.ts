import express from 'express';
import { SpecialityRoute } from '../../modules/Speciality/speciality.route.js';
import { UserRoute } from '../../modules/User/user.route.js';
import { DoctorRoutes } from '../../modules/User/Doctors/doctor.route.js';
import { AuthRoute } from '../../betterAuth/auth.route.js';

const router = express.Router()

const allRouter = [
    {
        path: "/specialties",
        routes: SpecialityRoute
    },
    {
        path: "/users",
        routes: UserRoute,
    },
    {
        path: "/doctors",
        routes: DoctorRoutes
    },
    {
        path: "/auth",
        routes: AuthRoute,
    }]

allRouter.forEach(singleRouter => router.use(singleRouter.path, singleRouter.routes))


export default router