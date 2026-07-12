import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js"
import messageRouter from "./routes/message.route.js"

const app = express()

app.use(express.json({limit: "10mb"})) // max image upload size. default is 100kb
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

const PORT = process.env.PORT || 5001

app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT)
    connectDB()
})