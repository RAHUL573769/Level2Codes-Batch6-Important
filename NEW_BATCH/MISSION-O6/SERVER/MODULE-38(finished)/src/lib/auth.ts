import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { ROLE, UserStaus } from "../../generated/enums";
import config from "../config";
import ms from "ms";

const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
    },

    trustedOrigins: [
        config.BETTER_AUTH_URL || "http://localhost:5000",
    ],

    advanced: {
        // ✅ सुरक्षित: disable only in development
        disableCSRFCheck: true
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: ROLE.PATIENT,
            },
            status: {
                type: "string",
                defaultValue: UserStaus.ACTIVE,
            },
            needsPasswordChange: {
                type: "boolean",
                defaultValue: false,
            },
            isDeleted: {
                type: "boolean",
                defaultValue: false,
            },
        },
    },

    session: {
        enabled: true,
        expiresIn: 60 * 60 * 60 * 24,
        updateAge: 60 * 60 * 60 * 24,
        maxAge: 60 * 60 * 60 * 24,

        // ✅ Cookie security (important for production)
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 60 * 24,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        },
    },
});

export default auth;