import { JwtPayload } from "jsonwebtoken"
import jwt from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string) => {

    const accessToken = jwt.sign(payload, secret as string, { expiresIn: "15m" })
    return accessToken
}


export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
}
