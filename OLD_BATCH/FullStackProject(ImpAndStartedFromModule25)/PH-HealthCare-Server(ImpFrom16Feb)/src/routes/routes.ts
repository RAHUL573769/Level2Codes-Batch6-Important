import express from 'express';
import { userRouter } from '../modules/User/user.route';
import { AdminRouter } from '../modules/Admin/admin.route';
import { AuthRouter } from '../modules/AuthForLogin/auth.route';


const router = express.Router()

const allRouterArray = [
    {
        path: "/user",
        route: userRouter

    },
    {
        path: "/admin",
        route: AdminRouter
    },

    {
        path: "/auth",
        route: AuthRouter
    }

]
// moduleRoutes.forEach(route => router.use(route.path, route.route))

allRouterArray.forEach(route => router.use(route.path, route.route))
export default router;