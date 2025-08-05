
import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import { PrismaClient } from "@prisma/client"
import addLevel from "./addLevel.js";


const allocationRoutes = Router()
const prisma = new PrismaClient()


allocationRoutes.get("/", authenticate, async (req, res)=>{
        try {
            const userId = req.user.id
            const allocation = await prisma.allocation.findMany({
            where: {
                userId:userId
            }
            })
            if (!allocation) return res.status(404).json({message: "data tidak ada"})
            res.status(200).json(allocation)
    } catch (error) {
        console.error("❌ Gagal ambil allocation:", err)
         res.status(500).json({ error: "Gagal ambil allocation dari database" })
    }
})

allocationRoutes.get("/:day", authenticate, async (req, res) => {
  const day = parseInt(req.params.day)
  const userId = req.user.id

  if (!day) {
    return res.status(400).json({ message: "Day tidak valid" })
  }

  try {
    const data = await prisma.allocation.findUnique({
      where: {
        userId_allocation_day: {
          userId,
          allocation_day: day
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

allocationRoutes.put("/modify/:day", authenticate, async (req, res)=>{
    const {item, harga, exp} = req.body
    const day =  parseInt(req.params.day)
    const userId = req.user.id

    if(!item || !harga || !exp){
        res.status(400).json({message: "All the column must be filled!"})
    }
    try {
        await prisma.allocation.update({
            where: {userId_allocation_day:{userId, allocation_day:day}},
            data: {
                items: item,
                price: parseInt(harga),
                allocation_exp: parseInt(exp)
            }
        })

        res.json({ sukses: true, message: "Data berhasil diupdate" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ sukses: false, message: "Gagal memperbarui status" });
    }
})

allocationRoutes.put("/status/:day", authenticate, async (req, res) => {
  const day = parseInt(req.params.day);
  const userId = req.user.id;

  try {
    const allocation = await prisma.allocation.findUnique({
      where: {
        userId_allocation_day: { userId, allocation_day:day  },
      },
    });
    await addLevel(userId, allocation.allocation_exp)

    if (!allocation) {
      return res.status(404).json({ message: "Data makan tidak ditemukan" });
    }

    if (allocation.allocation_status === "Finished") {
      return res.status(400).json({ message: "Sudah Finished" });
    }

    await prisma.allocation.update({
      where: {
        userId_allocation_day: { userId, allocation_day:day },
      },
      data: {
        allocation_status: "Finished",
      },
    });

    return res.json({ sukses: true, message: "Status berhasil diubah ke Finished" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Gagal update status" });
  }
});

allocationRoutes.put("/reset", authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
   const reset =  await  prisma.allocation.updateMany({
    where: {userId},
    data: {
      allocation_status: "Unfinished"
    }
   })

    return res.json({ sukses: true, message: "Status berhasil direset" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ message: "Gagal update status" });
  }
});


export default allocationRoutes

