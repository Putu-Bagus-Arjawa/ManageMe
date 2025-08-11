import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const userRoutes = Router()
const user =  async (req, res) => {
  try {
    const userFromDB = await prisma.user.findUnique({
      where: { id: req.user.id }, 
      select:{name: true,level:true, current_exp:true, registration_date: true, avatar:true}
    })

    if (!userFromDB) {
      return res.status(404).json({ error: "User tidak ditemukan" })
    }

    res.json({ user: userFromDB })
  } catch (err) {
    console.error("❌ Gagal ambil user:", err)
    res.status(500).json({ error: "Gagal ambil user dari database" })
  }
}


export default user