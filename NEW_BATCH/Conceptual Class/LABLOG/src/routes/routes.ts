import express from 'express';
import { userRouter } from '../modules/USER/user.route';
import { eqipmnentRouter } from '../modules/EQUIPMENT/equipment.route';

const router1 = express.Router()

const allRoutes = [
    {
        path: "/user",
        route: userRouter
    },
    {
        path: "/equipment",
        route: eqipmnentRouter
    }

]

allRoutes.forEach(route => router1.use(route.path, route.route))

export default router1