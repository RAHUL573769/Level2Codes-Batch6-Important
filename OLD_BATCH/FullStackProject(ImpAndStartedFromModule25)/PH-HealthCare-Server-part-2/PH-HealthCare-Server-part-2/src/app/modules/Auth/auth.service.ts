import { prisma } from "../../../../Resources/lib/prisma"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import config from "../../../config";
const loginUser = async (payload: { email: string, password: string }) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,

        }
    })
    const isPasswordCorrect = await bcrypt.compare(payload.password, userData.password)
    console.log(isPasswordCorrect)

    const JwtPayload = {
        email: payload.email,
        role: userData.role
    }
    var accessToken = jwt.sign(JwtPayload, config.JWT_SECRET as string, { expiresIn: "15m" });
    console.log(accessToken)
    // return userData

    const refreshToken = jwt.sign(JwtPayload, config.JWT_SECRET as string, { expiresIn: "30d" })
    return { userData, accessToken, needsPasswordChange: userData.needPasswordChange, refreshToken }
    // console.log(payload)
}

export const loginUserSerice = { loginUser }