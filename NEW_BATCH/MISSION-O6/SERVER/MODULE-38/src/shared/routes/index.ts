import express from 'express';
import { SpecialityRoute } from '../../modules/Speciality/speciality.route';
import { AuthRoute } from '../../betterAuth/auth.route';
import { DoctorRoutes } from '../../modules/User/Doctors/doctor.route';
import { UserRoute } from '../../modules/User/user.route';
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