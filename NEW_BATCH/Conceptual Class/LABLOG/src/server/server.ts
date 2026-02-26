import app from "../app/app";
import config from "../config";

// const PORT = 3000

function server() {

    app.listen(config.PORT, () => {
        console.log(`Server Running on ${config.PORT}`)
    })
}

server()