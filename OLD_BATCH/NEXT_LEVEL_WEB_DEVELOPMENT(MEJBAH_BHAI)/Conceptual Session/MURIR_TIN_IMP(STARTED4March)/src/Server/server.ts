import app from "../app/app"
import config from "../config"

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})