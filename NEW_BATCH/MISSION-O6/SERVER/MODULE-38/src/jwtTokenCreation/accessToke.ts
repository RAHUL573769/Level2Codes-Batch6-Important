import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../config";
import { jwtHelpers } from "./jwt";
import { Response } from "express";
import { cookieUtils } from "./cookies";
import ms, { StringValue } from "ms"

export const getAccessToken = (payload: JwtPayload) => {

    const accessToken = jwtHelpers.createToken(payload, config.ACCESS_TOKEN_SECRET as string, { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN } as SignOptions)

    return accessToken
}

export const getRefreshToken = (payload: JwtPayload) => {

    const accessToken = jwtHelpers.createToken(payload, config.REFRESH_TOKEN_EXPIRES_IN as string, { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN } as SignOptions)

    return accessToken
}

export const setAccessToken = (res: Response, token: string) => {


    const maxAge1 = ms(config.ACCESS_TOKEN_EXPIRES_IN as StringValue)
    cookieUtils.setCookies(res, "accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: Number(maxAge1)
    })
}

export const setRefreshToken = (res: Response, token: string) => {
    const maxAge = ms(config.ACCESS_TOKEN_EXPIRES_IN as StringValue)
    cookieUtils.setCookies(res, "refreshToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: Number(maxAge)
    })

}

export const setBetterAuthSession = (res: Response, token: string) => {
    const maxAge = ms(config.REFRESH_TOKEN_EXPIRES_IN as StringValue)
    cookieUtils.setCookies(res, "betterAuth", token, {

        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: Number(maxAge)
    })

}