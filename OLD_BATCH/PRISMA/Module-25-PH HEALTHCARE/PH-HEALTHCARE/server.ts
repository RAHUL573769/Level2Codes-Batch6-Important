import express from 'express'
import app from './app'

const port = 3000
app.listen(port, () => {
    console.log("Server")
})