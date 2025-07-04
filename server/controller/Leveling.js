import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { PrismaClient } from "@prisma/client";

const levelRoutes = Router()
const prisma = new PrismaClient()

levelRoutes.get('/labels', authenticate, async (req, res)=>{
    const data = await prisma.lEVEL_LABELS.findMany()
    res.json({LEVEL_LABELS:data })
})

levelRoutes.get('/tresholds', authenticate, async (req, res)=>{
   const data = await prisma.eXP_LEVEL_THRESHOLDS.findMany()
   res.json({EXP_LEVEL_THRESHOLDS: data})
})


export default levelRoutes