// import express from 'express'

import { Server } from "http"
import app from "./app"

// const app = express()
const port = 3000
// app.listen(port, () => {
//     console.log("Äspp")
// })

async function server() {
    const server: Server = app.listen(port, () => {
        console.log(`Server is running ${port}`)
    })

}

server()