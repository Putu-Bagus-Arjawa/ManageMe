import multer from "multer";
import prisma from "../lib/prisma.js";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName); 
  },
});

export const upload = multer({ storage });

export const avatar = async (req, res) => {
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



