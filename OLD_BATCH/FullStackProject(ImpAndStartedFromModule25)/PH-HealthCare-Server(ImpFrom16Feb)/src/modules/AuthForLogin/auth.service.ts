import bcrypt from "bcryptjs"
import { prisma } from "../../../lib/prisma"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
const loginUserService = async (payload: { email: string, password: string }) => {


    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    })

    const isPasswordExists = await bcrypt.compare(payload.password, isUserExists.password)

    if (!isPasswordExists) {
        throw new Error("Incorrect Password")
    }
    const jwtPayload = {
        email: isUserExists.email,
        role: isUserExists.role
    } as JwtPayload
    const accessToken = jwt.sign(jwtPayload, config.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" })
    console.log(accessToken)
    // console.log(isPasswordExists)
    // console.log(isUserExists)
    // console.log("Payload", payload)
    const refreshToken = jwt.sign(jwtPayload, config.REFRESH_TOKEN as string, { expiresIn: "30d" })
    console.log(refreshToken)
    return {
        accessToken: accessToken,
        needsPasswordChange: isUserExists.needPasswordChange,
        refreshToken: refreshToken

    }
}


export const LoginUserService = { loginUserService }