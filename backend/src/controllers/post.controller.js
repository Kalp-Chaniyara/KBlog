import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";
import { unlinkSync } from 'fs';

export const createPost = async (req, res) => {
     const { title, categoryOfPost, summary, image, discription } = req.body;
     try {
          const authorId = req.user._id

          if (!authorId)
               return res.status(400).json({ messge: "No authorId" });

          let uploadResponse;
          if (image) {
               uploadResponse = await cloudinary.uploader.upload(image);

               unlinkSync(image);

               const newPost = new Post({
                    title,
                    categoryOfPost,
                    summary,
                    image: uploadResponse.secure_url,
                    discription,
                    author: authorId,
               })

               await newPost.save();

               return res.status(200).json({
                    title,
                    categoryOfPost,
                    summary,
                    image: uploadResponse.secure_url,
                    discription,
                    author: authorId
               });
          }

          const newPost = new Post({
               title,
               categoryOfPost,
               summary,
               image: "",
               discription,
               author: authorId,
          })

          await newPost.save();

          res.status(200).json({
               title,
               categoryOfPost,
               summary,
               image: "",
               discription,
               author: authorId
          });
     } catch (error) {
          console.log("Error in the post controller", error.messge);
          res.status(500).json({ messge: "Internal Server Error" });
     }
}


export const getAllPosts = async (req, res) => {
     try {
          const {category} = req.query;
          const posts = await Post.find(category?{categoryOfPost:category}:{}).populate('author', 'fullName').sort({ createdAt: -1 }); // Fetch with populated author name

          res.status(200).json(posts);
     } catch (error) {
          console.log("Error in fetching all the posts", error.message);
          res.status(500).json({ message: "Intenal Server Error" })
     }
}