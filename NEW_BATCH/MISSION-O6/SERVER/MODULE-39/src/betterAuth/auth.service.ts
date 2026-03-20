import { date } from "better-auth";
import auth from "../lib/auth";
import { prisma } from "../lib/prisma";
import { jwtHelpers } from "../jwtTokenCreation/jwt";
import { getAccessToken, getRefreshToken } from "../jwtTokenCreation/accessToke";
import { UserStatus } from "../generated/prisma/enums";

interface IRegisterPayload {
    name: string
    email: string
    password: string
}
const registerPatient = async (payload: IRegisterPayload) => {
    const { name, email, password,
        // needsPasswordChange ,
    } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            //defaiult value
            // needsPasswordChange,
            // role: ROLE.PATIENT,
            //defaiult value
        },
    });

    if (!data?.user) {
        throw new Error("Failed to register");
    }
    try {

        //Todo
        const patient = await prisma.$transaction(async (tx) => {

            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email,
                }
            })

            return patientTx
        })
        // const patient = await prisma.$transaction(async (tx) => {
        //     await tx.patient.create({
        //         data: {
        //             userId: data.user.id,
        //             name: payload.name,
        //             email: payload.email

        //         }
        //     })
        // })

        //Todo
        const accessToken = getAccessToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified,
        });
        const refreshToken = getRefreshToken({
            userId: data.user.id,
            role: data.user.role,
            name: data.user.name,
            email: data.user.email,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified,
        });
        return {
            ...data,
            accessToken,
            refreshToken,
            patient
        }
    } catch (error) {
        await prisma.user.delete({
            where: { id: data.user.id }
        })
        throw error

    }
};

interface ILoginUserPayload {
    email: string
    password: string
}
const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload
    const data = await auth.api.signInEmail({
        body: {
            email, password
        }
    })
    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is Blocked")
    }
    const accessToken = getAccessToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    })
    const refreshToken = getRefreshToken({
        userId: data.user.id,
        role: data.user.role,
        name: data.user.name,
        email: data.user.email,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,
    });

    // return data
    return {
        ...data,
        accessToken, refreshToken
    }
}

export const AuthService = { loginUser, registerPatient }