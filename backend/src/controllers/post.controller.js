import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";
import { unlinkSync } from 'fs';

export const createPost = async (req, res) => {
     const { title, categoryOfPost, summary, image, discription } = req.body;
     try {
          const authorId = req.user._id

          if (!authorId)
               return res.status(400).json({ messge: "No authorId" });

          const uploadResponse = await cloudinary.uploader.upload(image);

          unlinkSync(image);

          const newPost = new Post({
               title,
               categoryOfPost,
               summary,
               image:uploadResponse.secure_url,
               discription,
               author:authorId,
          })

          await newPost.save();

          res.status(200).json({
               title,
               categoryOfPost,
               summary,
               image:uploadResponse.secure_url,
               discription,
               author:authorId
          });
     } catch (error) {
          console.log("Error in the post controller", error.messge);
          res.status(500).json({ messge: "Internal Server Error" });
     }
}