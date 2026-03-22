declare namespace NodeJs {
    export type ProcessEnv = {
        PORT: number
        BETTER_AUTH_URL: string
        BETTER_AUTH_SECRET: string

        ACCESS_TOKEN_SECRET: string
        REFRESH_TOKEN_SECRET: string
        ACCESS_TOKEN_EXPIRES_IN: string
        REFRESH_TOKEN_EXPIRES_IN: string
        BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: string
        BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: string
        CLOUDINARY_API_KEY: string
        CLOUDINARY_API_SECRET: string
        CLOUDINARY_API_NAME: string

    }
}