import prisma from "../lib/prisma.js";
import addLevel from "../lib/addLevel.js";

export const getEating = async (req, res)=>{
    try {
        const userId = req.user.id
        const eatings = await prisma.eating.findMany({
          where: {
            userId: userId
          }
        })
        if (!eatings) return res.status(404).json({message: "data tidak ada"})
        res.status(200).json(eatings)
    } catch (error) {
        console.error("❌ Gagal ambil eating:", err)
         res.status(500).json({ error: "Gagal ambil eating dari database" })
    }
}

export const getEatingByDay = async (req, res) => {
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
}

export const modifyEating =  async (req, res)=>{
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
}

export const updateStatusEating = async (req, res) => {
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
}


export const resetStatusEating = async (req, res) => {
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
}
