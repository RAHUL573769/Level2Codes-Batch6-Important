import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
    PORT: process.env.PORT,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_VALIDITY_TIME: process.env.ACCESS_TOKEN_VALIDITY_TIME,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
}