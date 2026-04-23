
import { TourRoute } from "../routes/ttour.route";
import { userRouter } from "../routes/user.routes";

export const allRouter = [


    {
        path: "/users",
        route: userRouter
    },
    {
        path: "/tours",
        route: TourRoute
    }
]