import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { PrismaClient } from "@prisma/client";
import addLevel from "./addLevel.js";

const taskRoutes = Router()
const prisma = new PrismaClient()

taskRoutes.post("/finish/:taskId", authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const taskId = parseInt(req.params.taskId)

    const task = await prisma.task.findUnique({ where: { id: taskId } })

    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: "Task tidak ditemukan atau bukan milik user" })
    }

    const { updatedLevel, updatedExp } = await addLevel(userId, task.exp)

    await prisma.task.delete({ where: { id: taskId } })

    return res.status(200).json({
      message: `Task "${task.nama_task}" selesai.`,
      task: task.nama_task,
      task_exp: task.exp,
      user_level: updatedLevel,
      user_exp: updatedExp
    })

  } catch (error) {
    console.error("❌ Transaction gagal:", error)
    return res.status(500).json({ error: "Gagal menyelesaikan task secara aman" })
  }
})


taskRoutes.post("/insert", authenticate, async (req, res)=>{
    const {task, exp} = req.body

    try {
    if(!task || !exp) return res.status(400).json({ message: "Semua field wajib diisi" });
      await prisma.task.create({
            data:{
                nama_task:task, 
                exp: exp,
                userId: req.user.id 
            }
        })
        res.status(201).json({message: "data sukses ditambah"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Registrasi gagal',
            detail: error.message 
        });
    }
})

taskRoutes.get("/", authenticate, async(req, res)=>{
    const userId = req.user.id
    const data = await prisma.task.findMany({where:{userId}})
    res.json({task: data})
})

export default taskRoutes