import { date } from "better-auth";
import { ROLE, User, UserStaus } from "../../generated/client";
import auth from "../lib/auth";
import { prisma } from "../lib/prisma";

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
            await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email

                }
            })
        })

        //Todo

        return {
            data
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
    if (data.user.status === UserStaus.BLOCKED) {
        throw new Error("User is Blocked")
    }
    return data
}

export const AuthService = { loginUser, registerPatient }