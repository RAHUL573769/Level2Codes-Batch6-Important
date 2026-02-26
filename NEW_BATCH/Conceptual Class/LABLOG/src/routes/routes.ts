import express from 'express';
import { userRouter } from '../modules/USER/user.route';

const router1 = express.Router()

const allRoutes = [
    {
        path: "/user",
        route: userRouter
    }
]

allRoutes.forEach(route => router1.use(route.path, route.route))

export default router1