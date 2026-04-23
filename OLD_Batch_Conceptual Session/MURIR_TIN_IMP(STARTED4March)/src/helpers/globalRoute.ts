import express from 'express';

import { allRouter } from '../contants/route.contants';

const globalRouter = express.Router()


// const allRouter = [
//     {
//         path: "/users",
//         route: userRouter
//     }
// ]

allRouter.forEach(singleRouter => {
    globalRouter.use(singleRouter.path, singleRouter.route)
})


export default globalRouter