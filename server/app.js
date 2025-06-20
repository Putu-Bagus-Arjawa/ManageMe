import express from "express";
import cors from "cors";


const app = express()
app.use(cors({credentials:true, origin: 'http://localhost:5173'}))
app.use(express.json())
const PORTS = 4000



app.listen(PORTS, ()=> console.log(`Server Berjalan di Port ${PORTS}`))