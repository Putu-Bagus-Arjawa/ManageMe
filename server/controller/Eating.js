
import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import { PrismaClient } from "@prisma/client"
import addLevel from "./addLevel.js";


const eatingRoutes = Router()
const prisma = new PrismaClient()

eatingRoutes.get("/", authenticate, async (req, res)=>{
    try {
        const eatings = await prisma.eating.findMany()
        if (!eatings) return res.status(404).json({message: "data tidak ada"})
        res.status(200).json(eatings)
    } catch (error) {
        console.error("❌ Gagal ambil user:", err)
         res.status(500).json({ error: "Gagal ambil user dari database" })
    }
})
eatingRoutes.put("/status/:day", authenticate, async (req, res) => {
  const day = parseInt(req.params.day);
  const userId = req.user.id;

  try {
    const eating = await prisma.eating.findUnique({
      where: {
        userId_day: { userId, day },
      },
    });
    await addLevel(userId, eating.eating_exp)

    if (!eating) {
      return res.status(404).json({ message: "Data makan tidak ditemukan" });
    }

    if (eating.eating_status === "Finished") {
      return res.status(400).json({ message: "Sudah Finished" });
    }

    await prisma.eating.update({
      where: {
        userId_day: { userId, day },
      },
      data: {
        eating_status: "Finished",
      },
    });

    return res.json({ sukses: true, message: "Status berhasil diubah ke Finished" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Gagal update status" });
  }
});

eatingRoutes.put("/reset", authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
   const reset =  await  prisma.eating.updateMany({
    where: {userId},
    data: {
      eating_status: "Unfinished"
    }
   })

    return res.json({ sukses: true, message: "Status berhasil direset" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Gagal update status" });
  }
});

eatingRoutes.put("/modify/:day", authenticate, async (req, res)=>{
    const {item, harga, gizi, exp} = req.body
    const day =  parseInt(req.params.day)
    const userId = req.user.id

    if(!item || !harga || !gizi || !exp){
        res.status(400).json({message: "All the column must be filled!"})
    }
    try {
        await prisma.eating.update({
            where: {userId_day:{userId, day}},
            data: {
                items: item,
                price: parseInt(harga),
                gizi,
                eating_exp: parseInt(exp)
            }
        })

        res.json({ sukses: true, message: "Data berhasil diupdate" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sukses: false, message: "Gagal memperbarui status" });
    }
})

eatingRoutes.get("/:day", authenticate, async (req, res) => {
  const day = parseInt(req.params.day)
  const userId = req.user.id

  if (!day) {
    return res.status(400).json({ message: "Day tidak valid" })
  }

  try {
    const data = await prisma.eating.findUnique({
      where: {
        userId_day: {
          userId,
          day
        }
      }
    })

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" })
    }

    res.json(data)
  } catch (err) {
    console.error("❌ Error saat ambil data:", err)
    res.status(500).json({ message: "Gagal mengambil data makan" })
  }
})

eatingRoutes.put("/status/:day", authenticate, async(req, res)=> {
    const {eating_status} = req.body
    const day =  parseInt(req.params.day)
    const userId = req.user.id
    try {
          await prisma.eating.update({
            where: {userId_day:{userId, day}},
            data: {
                eating_status: eating_status
            }
        })

        res.json({ sukses: true, message: "Data berhasil diupdate" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sukses: false, message: "Gagal memperbarui status" });
    }

})

eatingRoutes.put("/status/reset", authenticate, async(req, res)=> {
    const {eating_status} = req.body
    const userId = req.user.id
    try {
          await prisma.eating.update({
            where: {userId_day:{userId}},
            data: {
                eating_status: eating_status
            }
        })

        res.json({ sukses: true, message: "Data berhasil diupdate" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sukses: false, message: "Gagal memperbarui status" });
    }

})
export default eatingRoutes