import prisma from "../lib/prisma.js";


export const levelLabels = async (req, res)=>{
    const data = await prisma.level_labels.findMany()
    res.json({LEVEL_LABELS:data })
}

export const tresholdsLevel =async (req, res)=>{
   const data = await prisma.exp_level_thresholds.findMany()
   res.json({EXP_LEVEL_THRESHOLDS: data})
}


