import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./middleware/Auth.js";
import cookieParser from "cookie-parser";
import userRoutes from "./controller/getUser.js";
import levelRoutes from "./controller/Leveling.js";
import uploadAvatar from "./controller/uploadAvatar.js";
import taskRoutes from "./controller/task.js";
import eatingRoutes from "./controller/Eating.js";


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






app.listen(PORTS, ()=> console.log(`Server Berjalan di Port ${PORTS}`))