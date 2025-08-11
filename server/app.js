import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";



import authRoutes from "./routes/authRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadAvatar from "./routes/uploadAvatar.js";
import eatingRoutes from "./routes/eatingRoutes.js";
import allocationRoutes from "./routes/allocationRoutes.js";



dotenv.config()

const app = express()
const PORTS = process.env.PORT
app.use(cors({credentials:true, origin: [
    'http://localhost:5173',
    'http://localhost:5174',
]}))

app.use(cookieParser())
app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/level', levelRoutes)
app.use("/user", uploadAvatar)
app.use("/task", taskRoutes)
app.use("/eating", eatingRoutes)
app.use("/allocation", allocationRoutes)






app.listen(PORTS, ()=> console.log(`Server Berjalan di Port ${PORTS}`))