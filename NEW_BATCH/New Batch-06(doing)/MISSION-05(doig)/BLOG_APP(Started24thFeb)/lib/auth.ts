import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import config from "../config";
// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/generated/prisma/client";



import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: config.APP_GMAIL,
        pass: config.APP_PASSWORD,
    },
});
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    //extendinguser
    user: {
        additionalFields: {
            role: { type: "string", defaultValue: "USER", required: false },
            phone: {
                type: "string",
                required: false
            }, status: {
                type: "string",
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            console.log("Email verification sent")
            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
                to: "rahulrudra665@gmail.com",
                subject: "Hello ✔",
                text: "Hello world?", // Plain-text version of the message
                html: "<b>Hello world?</b>", // HTML version of the message
            });
        },
    },

    trustedOrigins: ["http://localhost:3000"],
    advanced: { disableOriginCheck: true }
});