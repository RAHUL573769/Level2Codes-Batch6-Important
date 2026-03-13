
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { betterAuth } from "better-auth";
import config from "../config";

export const betterauth1 = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    socialProviders: {
        github: {
            clientId: config.GITHUB_CLIENT_ID as string,
            clientSecret: config.GITHUB_CLIENT_SECRET as string
        }
    },

    trustedOrigins: ["http://localhost:4000"],

    advanced: {
        disableOriginCheck: true,
    },
});