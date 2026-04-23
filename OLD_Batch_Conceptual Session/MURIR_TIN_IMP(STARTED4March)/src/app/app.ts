import express, { NextFunction, Request, Response } from 'express'

import cors from "cors"
import globalRouter from '../helpers/globalRoute'

import globalErrorHandler from '../helpers/globalErrorHandler';
import { error } from 'node:console';
import { notFound } from '../helpers/notFounf';



require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1", globalRouter)
app.use(globalErrorHandler)
app.use(notFound)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to  Murir Tin Tours & Travels',
    })
})

export default app

