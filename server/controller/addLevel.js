 import { PrismaClient } from "@prisma/client";



 const prisma = new PrismaClient()
 
 async function addLevel(userId, expToAdd) {

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw new Error("User not found")

  let currentExp = user.current_exp + expToAdd
  let currentLevel = user.level

  const thresholds = await prisma.exp_level_thresholds.findMany({
    orderBy: { level: "asc" }
  })

  for (let i = currentLevel; i < thresholds.length; i++) {
    const threshold = thresholds.find(t => t.level === currentLevel)
    if (!threshold) break

    if (currentExp >= threshold.exp_required) {
      currentExp -= threshold.exp_required
      currentLevel++
    } else {
      break
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      current_exp: currentExp,
      level: currentLevel
    }
  })

  return {
    updatedLevel: currentLevel,
    updatedExp: currentExp
  }
}
export default addLevel

