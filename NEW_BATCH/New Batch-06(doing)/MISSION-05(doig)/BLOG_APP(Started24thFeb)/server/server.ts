import app from "../app/app"
import config from "../config"


app.listen(config.PORT, () => {
    console.log(`Server running at http://localhost:${config.PORT}`)
})
