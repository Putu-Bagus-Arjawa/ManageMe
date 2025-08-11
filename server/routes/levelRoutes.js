import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { levelLabels, tresholdsLevel } from "../controller/levels.js";


const levelRoutes = Router()

levelRoutes.get('/labels', authenticate, levelLabels)
levelRoutes.get('/tresholds', authenticate, tresholdsLevel)


export default levelRoutes