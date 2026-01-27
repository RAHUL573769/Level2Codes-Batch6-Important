import express from "express";
import { UserRouter } from "../modules/User/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
// import { AdminRouter } from "../modules/Admin/admin.route";

const router = express.Router();

const moduleRoute = [
    {
        path: "/users",
        route: UserRouter,
    },
    {
        path: "/auth",
        route: AuthRouter
    }
    // {
    //     path: "/admin",
    //     route: AdminRouter,
    // },
];

moduleRoute.forEach(route => router.use(route.path, route.route));

export default router;
