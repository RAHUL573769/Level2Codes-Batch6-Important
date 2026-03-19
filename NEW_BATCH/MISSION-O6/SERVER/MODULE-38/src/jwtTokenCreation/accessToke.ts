import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../config";
import { jwtHelpers } from "./jwt";


export const getAccessToken = (payload: JwtPayload) => {

    const accessToken = jwtHelpers.createToken(payload, config.ACCESS_TOKEN_SECRET as string, { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN } as SignOptions)

    return accessToken
}

export const getRefreshToken = (payload: JwtPayload) => {

    const accessToken = jwtHelpers.createToken(payload, config.REFRESH_TOKEN_EXPIRES_IN as string, { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN } as SignOptions)

    return accessToken
}