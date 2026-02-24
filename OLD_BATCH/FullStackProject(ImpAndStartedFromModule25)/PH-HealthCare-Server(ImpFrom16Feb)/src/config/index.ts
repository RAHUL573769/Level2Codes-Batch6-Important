import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
    PORT: process.env.PORT,
    CLOUDIARY_NAME: process.env.CLOUDIARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_VALIDITY_TIME: process.env.ACCESS_TOKEN_VALIDITY_TIME,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    REFRESH_TOKEN_VALIDITY_TIME: process.env.REFRESH_TOKEN_VALIDITY_TIME,
    RESET_PASSWORD_TOKEN: process.env.RESET_PASSWORD_TOKEN,
    RESET_PASSWORD_TOKEN_EXPIRES: process.env.RESET_PASSWORD_TOKEN_EXPIRES,
    RESET_PASSWORD_LINK: process.env.RESET_PASSWORD_LINK,
    emailSenders: {
        email: process.env.EMAIL,
        APP_PASSWORD: process.env.APP_PASS

    },

}