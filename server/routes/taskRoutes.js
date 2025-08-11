import { Router } from "express"
import authenticate from "../middleware/authenticate.js"
import { finishTask, getTask, insertTask } from "../controller/task.js"

const taskRoutes = Router()


taskRoutes.get("/", authenticate, getTask)
taskRoutes.post("/insert", authenticate, insertTask)
taskRoutes.post("/finish/:taskId", authenticate, finishTask)

export default taskRoutes