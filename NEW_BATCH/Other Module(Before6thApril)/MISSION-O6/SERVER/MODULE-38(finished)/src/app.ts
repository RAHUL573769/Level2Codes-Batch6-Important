import express, { Application, NextFunction, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import status from "http-status";
import { SpecialityRoute } from "./modules/Speciality/speciality.route";
import router from "./shared/routes";
import { toNodeHandler } from "better-auth/node";
import auth from "./lib/auth";
import { globalErrorHandler } from "./helpers/globalErrorHandler";
import { notFound } from "./helpers/notFound";

const app: Application = express();

// Enable URL-encoded form data parsing
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
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