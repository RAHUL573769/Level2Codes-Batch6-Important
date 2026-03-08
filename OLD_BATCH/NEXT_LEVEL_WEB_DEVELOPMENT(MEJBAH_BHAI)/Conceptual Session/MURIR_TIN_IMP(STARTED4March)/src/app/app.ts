import express, { Request, Response } from 'express'

import cors from "cors"
import globalRouter from '../routers/globalRoute'

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1", globalRouter)
// app.get('/', (req: Request, res: Response) => {
//     res.status(200).json({
//         status: 'success',
//         message: 'Welcome to  Murir Tin Tours & Travels',
//     })
// })

export default app

