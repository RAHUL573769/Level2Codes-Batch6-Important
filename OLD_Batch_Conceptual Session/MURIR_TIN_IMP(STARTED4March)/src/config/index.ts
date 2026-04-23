import dotenv from "dotenv"
import path from "path"
dotenv.config({ path: path.join(process.cwd(), ".env") })

export default {
    PORT: process.env.PORT,
    DB_CLOUD: process.env.DB_CLOUD,
    DB_LOCAL: process.env.DB_LOCAL
}