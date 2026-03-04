import { prisma } from "../../lib/prisma"
import bcrypt from 'bcrypt';
const loginUser = async (payload1: {
    email: string,
    password: string,
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload1.email
        }
    })
    const isCorrectPassword = await bcrypt.compare(payload1.password, userData.password)
    console.log(isCorrectPassword)
    return userData
    // console.log("User Login In")
}


export const loginUserService = { loginUser }