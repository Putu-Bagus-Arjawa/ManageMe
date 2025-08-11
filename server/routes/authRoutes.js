import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import { login, logout, register } from "../middleware/Auth.js"
import { verify } from "../middleware/verify.js"


const authRoutes = Router()

authRoutes.get("/verify", authenticate, verify)
authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.delete("/logout", logout)

export default authRoutes
