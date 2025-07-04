
import jewete from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()


const authenticate = async (req, res, next)=>{
        try {
            const token =  req.cookies.token
            if(!token) return res.status(401).json({message: "Required authenticate"})
            const decoded = jewete.verify(token, process.env.JWT_RAHASIA)
            const user = await prisma.user.findUnique({
                where:{id: decoded.id}
            })
            if(!user) return res.status(404).json({message: "User Not Found"})
            req.user = decoded
            next()
        } catch (error) {
             return res.status(401).json({ error: 'Invalid token' }); 
    }
}



export default  authenticate