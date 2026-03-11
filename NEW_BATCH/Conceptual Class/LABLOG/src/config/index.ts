import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
});
export default {
    PORT: process.env.PORT,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    FRONTEND_URL: process.env.FRONTEND_URL
}