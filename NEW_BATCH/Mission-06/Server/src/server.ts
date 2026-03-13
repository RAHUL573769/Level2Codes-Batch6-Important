import app from "./app"
import config from "./config"


function server() {
    app.listen(config.PORT, () => {
        console.log(`Example app listening on port ${config.PORT}`)
    })

}
server()