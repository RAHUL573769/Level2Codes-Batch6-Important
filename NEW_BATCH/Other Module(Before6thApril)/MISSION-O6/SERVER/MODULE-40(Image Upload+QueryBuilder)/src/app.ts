import { toNodeHandler } from "better-auth/node";
import { Application, Request, Response } from "express";
import express from 'express';

import router from "./shared/routes/index.js";
import { globalErrorHandler } from "./helpers/globalErrorHandler.js";
import { prisma } from "./lib/prisma.js";
import status from "http-status";
import { notFound } from "./helpers/notFound.js";
import { auth } from "./lib/auth.js";
import cookieParser from "cookie-parser";


const app: Application = express();

// Enable URL-encoded form data parsing
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1", router)
app.use(globalErrorHandler)

// Basic route
app.get('/test', async (req: Request, res: Response) => {
    const specialty = await prisma.specialty.create({
        data: {
            title: "Speciality1"
        }
    })
    res.status(status.OK).json({
        message: "Spexial",
        status: true,
        data: specialty
    })
});
app.get('/', async (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});

app.use(notFound)
export default app;