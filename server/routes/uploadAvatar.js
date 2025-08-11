import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { avatar, upload } from "../controller/uploadAvatar.js";


const uploadAvatar = Router();

uploadAvatar.post("/avatar", authenticate, upload.single("avatar"), avatar)

export default uploadAvatar