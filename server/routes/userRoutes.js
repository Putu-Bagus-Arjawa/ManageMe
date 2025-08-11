import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import user from "../controller/user.js"
   

const userRoutes = Router()
    
userRoutes.get("/", authenticate, user)

    
export default userRoutes