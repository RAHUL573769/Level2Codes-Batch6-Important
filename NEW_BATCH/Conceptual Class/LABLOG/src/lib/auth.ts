
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { betterAuth } from "better-auth";
import config from "../config";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    appName: "My App", // provide your app name. It'll be used as an issuer.

    socialProviders: {
        github: {
            clientId: config.GITHUB_CLIENT_ID as string,
            clientSecret: config.GITHUB_CLIENT_SECRET as string,
            redirectURI: "http://localhost:4000"
        }
    },

    trustedOrigins: [`${config.FRONTEND_URL}/api/auth/callback/github`],
    advanced: {
        disableOriginCheck: true,
    },
    plugins: [
        twoFactor({
            otpOptions: {
                async sendOTP(data, ctx) {
                    console.log(data, ctx)
                },
            }
        })
    ],
});