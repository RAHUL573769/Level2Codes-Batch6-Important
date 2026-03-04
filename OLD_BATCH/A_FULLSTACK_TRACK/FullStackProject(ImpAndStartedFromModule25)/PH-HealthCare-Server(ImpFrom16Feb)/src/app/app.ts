import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import cookieParser from "cookie-parser";
import router from "../routes/routes";
// import { globalErrorHandlers } from '../middlewares/globalErrorHandlers';
import 'dotenv/config';
import { globalErrorHandlers } from '../middlewares/globalErorHandlers';

const app: Application = express();



// Body parsers

app.use(cors())



app.use(express.json());        // for JSON
app.use(express.urlencoded({ extended: true })); // for form data
// Cookie parser
app.use(cookieParser());

// Test route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// API routes
app.use("/api/v1", router);

// Global error handler (must be last)
app.use(globalErrorHandlers);

export default app;