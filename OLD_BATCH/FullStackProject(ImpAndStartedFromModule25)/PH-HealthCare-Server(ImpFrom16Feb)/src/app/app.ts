import { Application, Request, Response } from "express"
import cors from 'cors';
import express from 'express';
import { userRouter } from "../modules/User/user.route";
import { AdminRouter } from "../modules/Admin/admin.route";
import router from "../routes/routes";
require('dotenv').config() // or import 'dotenv/config' if you're using ES6



const app: Application = express()
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
app.use("/api/v1", router)
// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', AdminRouter);
export default app;


