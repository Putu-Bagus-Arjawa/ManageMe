import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const uploadAvatar = Router();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); 
  },
});

const upload = multer({ storage });

uploadAvatar.post("/avatar", authenticate, upload.single("avatar"), async (req, res) => {
    try {
      const userId = req.user.id;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const avatarPath = `/uploads/${req.file.filename}`;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { avatar: avatarPath },
      });

      res.json({
        message: "Avatar updated",
        avatar: avatarPath,
        updated: updatedUser,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default uploadAvatar;
