import express, { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import status from "http-status";
import { SpecialityRoute } from "./modules/Speciality/speciality.route";
import router from "./shared/routes";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/v1", router)
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
export default app;