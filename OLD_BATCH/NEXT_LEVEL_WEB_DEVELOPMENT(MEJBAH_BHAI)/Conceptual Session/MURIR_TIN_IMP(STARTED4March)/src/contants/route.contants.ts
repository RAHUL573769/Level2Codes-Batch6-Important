import { userRouter } from "../routers/user.route";

export const allRouter = [

    { path: "/", route: userRouter },
    {
        path: "/users",
        route: userRouter
    }
]