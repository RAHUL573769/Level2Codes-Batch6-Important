import express, { Request, Response } from "express"
import app from "../app/app"



const port = 3000

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
