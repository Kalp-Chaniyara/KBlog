import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { getAllPosts } from "../controllers/post.controller.js";
import { getPerticularPost } from "../controllers/post.controller.js";
import sharp from "sharp";
import path from "path";

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

router.post("/upload", upload.single('file'), async (req, res) => {
     if (!req.file) {
          return res.status(400).send('No file uploaded');
     }
     const localPath = req.file.path;

     // let outputPath="public/temp/";

     const outputPath = path.join(
          path.dirname(localPath),
          `${path.parse(localPath).name}_resized${path.extname(localPath)}`
     );

     await sharp(localPath).resize({ width: 200, height: 200,         // Adds padding to fit exactly 200x200 without cropping
          background: { r: 255, g: 255, b: 255, alpha: 0 } }).toFile(outputPath);

     console.log("Done");
     console.log("objectPath",outputPath);

     res.json({outputPath});
});

router.post("/create-post", validateToken, createPost);

router.get("/allPosts",getAllPosts);

router.get("/id/:id",getPerticularPost);

export default router