import { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import express from 'express';
import cookieParser from "cookie-parser";


import router from "../routes/routes";
import { globalErrorHandlers } from '../middlewares/globalErorHandlers';
require('dotenv').config() // or import 'dotenv/config' if you're using ES6



const app: Application = express()
app.use(cors());
app.use(cookieParser());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
app.use("/api/v1", router)
app.use(globalErrorHandlers)
// app.use()
// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/admin', AdminRouter);
export default app;


