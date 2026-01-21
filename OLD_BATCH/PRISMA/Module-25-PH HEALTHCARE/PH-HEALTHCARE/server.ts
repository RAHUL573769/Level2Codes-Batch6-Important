
import app from './app'
import { Server } from 'http'

const port = 3000
// app.listen(port, () => {
//     console.log("Server")
// })

async function server() {
    const server: Server = app.listen(port, () => {
        console.log("Server")
    })
}

server()