import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import path from "path"

import authRouter from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
import messageRouter from "./routes/message.route.js"
import { app, server } from "./lib/socket.js"



app.use(express.json({ limit: "10mb" })) // max image upload size. default is 100kb
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT)
    connectDB()
})