import dotenv from "dotenv"
import path from "path"


dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    PORT: process.env.PORT,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    APP_URL: process.env.APP_URL,
    APP_NAME: process.env.APP_NAME,
    APP_PASSWORD: process.env.APP_PASSWORD,
    APP_GMAIL: process.env.APP_GMAIL
}