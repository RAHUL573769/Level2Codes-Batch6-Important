import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { ROLE, UserStaus } from "../../generated/enums";
import config from "../config";
import ms, { StringValue } from "ms";
// If your Prisma file is located elsewhere, you can change the path


// const prisma = new PrismaClient();
const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc


    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [

        config.BETTER_AUTH_URL || "http://localhost:5000/"],
    advanced: {
        disableCSRFCheck: true
    },

    //add additional fiels after generation
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: ROLE.PATIENT

            },
            status: {
                type: "string",
                defaultValue: UserStaus.ACTIVE,
            },
            needsPasswordChange: {
                type: "boolean",
                defaultValue: false
            },
            isDeleted: {
                type: "boolean",
                defaultValue: false
            }
        }
    },
    //add additional fiels after generation
    session: {
        expiresIn: Number(ms(config.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue)),
        updateAge: Number(ms(config.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE as StringValue)),
        cookieCache: {
            enabled: true,
            maxAge: Number(ms(config.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue)),

    // httpOnly: true,
    // secure: true,
    // sameSite: "none",



        }
    }
});

export default auth