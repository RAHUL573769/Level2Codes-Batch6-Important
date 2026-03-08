import express, { Request, Response } from 'express';

const router = express.Router()


router.get('/get', (req: Request, res: Response) => {
    res.send('Hello World!')
})

router.get("/get-user", (req: Request, res: Response) => {
    res.status(200).json({
        message: "User Fetched"
    })
})




export const userRouter = router

