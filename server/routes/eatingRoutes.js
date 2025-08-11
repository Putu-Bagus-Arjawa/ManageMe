import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import { getEating, getEatingByDay, modifyEating, resetStatusEating, updateStatusEating } from "../controller/Eating.js"

const eatingRoutes = Router()

eatingRoutes.get("/", authenticate, getEating)
eatingRoutes.get("/:day", authenticate, getEatingByDay)
eatingRoutes.put("/modify/:day", authenticate, modifyEating)
eatingRoutes.put("/status/:day", authenticate, updateStatusEating)
eatingRoutes.put("/reset", authenticate, resetStatusEating)

export default eatingRoutes