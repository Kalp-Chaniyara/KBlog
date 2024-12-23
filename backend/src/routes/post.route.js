import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import multer from "multer";

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, "./public"); // Set the destination folder to "public"
     },
     filename: (req, file, cb) => {
          cb(null, file.originalname); // Use the current timestamp as the file name
     }
});

const upload = multer({ storage: storage });

const router = Router()

router.post("/upload", upload.single('file'), (req, res) => {
     if (!req.file) {
          return res.status(400).send('No file uploaded');
     }
     const localPath = req.file.path;

     res.json({localPath});
});

router.post("/create-post", validateToken, createPost);

export default router