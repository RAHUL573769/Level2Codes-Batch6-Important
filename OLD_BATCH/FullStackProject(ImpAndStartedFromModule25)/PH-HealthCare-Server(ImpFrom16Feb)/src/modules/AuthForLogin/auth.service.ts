import bcrypt from "bcryptjs"
import { prisma } from "../../../lib/prisma"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import { generateToken, verifyToken } from "../../helpers/jwtHelpers";
import { UserStatus } from "../../../generated/prisma/enums";
import emailSender from "./emailSender";



// const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {

//     const accessToken = jwt.sign(payload, secret as string, { expiresIn: "15m" })
//     return accessToken
// }

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
    // if (!process.env.JWT_SECRET) {
    //     throw new Error("JWT_SECRET is not defined");
    // }
    // const accessToken = jwt.sign(jwtPayload, config.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" })

    const accessToken = generateToken(jwtPayload, config.ACCESS_TOKEN_SECRET as string, config.REFRESH_TOKEN_VALIDITY_TIME as string)


    console.log(accessToken)
    // console.log(isPasswordExists)
    // console.log(isUserExists)
    // console.log("Payload", payload)


    // const refreshToken = jwt.sign(jwtPayload, config.REFRESH_TOKEN as string, { expiresIn: "30d" })

    const refreshToken = generateToken(jwtPayload, config.REFRESH_TOKEN as string, config.ACCESS_TOKEN_VALIDITY_TIME as string)

    console.log(refreshToken)
    return {
        accessToken: accessToken,
        needsPasswordChange: isUserExists.needPasswordChange,
        refreshToken: refreshToken

    }
}
const refreshTokenService = async (token: string) => {
    let decodedData;
    try {
        decodedData = verifyToken(token,
            // config.jwt.refresh_token_secret as Secret
            config.REFRESH_TOKEN as string

        );
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    });

    // const accessToken = jwtHelpers.generateToken({
    //     email: userData.email,
    //     role: userData.role
    // },
    //     config.jwt.jwt_secret as Secret,
    //     config.jwt.expires_in as string
    // );

    const accessToken = generateToken({
        email: userData.email,
        role: userData.role
    },
        config.ACCESS_TOKEN_SECRET as string,
        config.ACCESS_TOKEN_VALIDITY_TIME as string
    );

    return {
        accessToken,
        needPasswordChange: userData.needPasswordChange
    };

};

const changePasswordService = async (user: any, payload: any) => {

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    })
    console.log("UserData for PasswordChage From AuthService", userData)
    console.log("Payload for PasswordChage From AuthService", payload)
    const isPasswordCorrect: boolean = await bcrypt.compare(payload.oldPassword, userData.password)
    console.log("IsPasswordChange From AuthService", isPasswordCorrect)
    // if (!isPasswordCorrect) {
    //     throw new Error("Password Incorrect")
    // }
    const hashedPassword = await bcrypt.hash(payload.newPassword, 12)
    console.log("HashedPassword", hashedPassword)
    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
            needPasswordChange: false
        }
    })

}

const forgetPasswordService = async (payload: { email: string }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })
    console.log("User Data From ForgetPasswordService", userData)
    const payload1 = { email: userData.email, role: userData.role }
    const resetPassToken = generateToken(payload1, config.RESET_PASSWORD_TOKEN as string, config.RESET_PASSWORD_TOKEN_EXPIRES as string)
    console.log("ResetPasswordToken", resetPassToken)
    // http://localhost:3000/reset-password?email=rahul@gmail.com&token=hhfhffd

    const resetPasswordLink = config.RESET_PASSWORD_LINK + `?email=${userData.id}&token=${resetPassToken}`
    await emailSender(userData.email, `     <div>
            <p>Dear User,</p>
            <p>Your password reset link
                <a href=${resetPasswordLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>`)

    console.log("ResetPasswordLnk", resetPasswordLink)

}
export const LoginUserService = { forgetPasswordService, changePasswordService, loginUserService, refreshTokenService }