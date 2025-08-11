import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import { getAllocation, getAllocationByDay, modifyAllocation, resetAllocationStatus, updateAllocationStatus } from "../controller/Allocation.js"


const allocationRoutes = Router()

allocationRoutes.get("/", authenticate,  getAllocation)
allocationRoutes.get("/:day", authenticate,  getAllocationByDay)
allocationRoutes.put("/modify/:day", authenticate, modifyAllocation)
allocationRoutes.put("/status/:day", authenticate, updateAllocationStatus)
allocationRoutes.put("/reset", authenticate, resetAllocationStatus)

export default allocationRoutes