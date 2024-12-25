import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createPost = async (req, res) => {
     const { title, categoryOfPost, summary, image, discription } = req.body;
     try {
          const authorId = req.user._id

          if (!authorId)
               return res.status(400).json({ messge: "No authorId" });

          // console.log("IMAGE IN CONTROLLER", image);

          const uploadResponse = await cloudinary.uploader.upload(image);

          // console.log("DONE AFTER UPLOADING", uploadResponse);

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

     // let uploadResponse;
     // if (image) {
     //      uploadResponse = await cloudinary.uploader.upload(image);

     //      unlinkSync(image);

     //      const newPost = new Post({
     //           title,
     //           categoryOfPost,
     //           summary,
     //           image: uploadResponse.secure_url,
     //           discription,
     //           author: authorId,
     //      })

     //      await newPost.save();

     //      return res.status(200).json({
     //           title,
     //           categoryOfPost,
     //           summary,
     //           image: uploadResponse.secure_url,
     //           discription,
     //           author: authorId
     //      });
     // }

     // const newPost = new Post({
     //      title,
     //      categoryOfPost,
     //      summary,
     //      image: "",
     //      discription,
     //      author: authorId,
     // })

     // await newPost.save();

     // res.status(200).json({
     //      title,
     //      categoryOfPost,
     //      summary,
     //      image: "",
     //      discription,
     //      author: authorId
     // });
     catch (error) {
          console.log("Error in the post controller", error.messge);
          res.status(500).json({ messge: "Internal Server Error" });
     }
}


export const getAllPosts = async (req, res) => {
     try {
          const { category } = req.query;
          const posts = await Post.find(category ? { categoryOfPost: category } : {}).populate('author', 'fullName').sort({ createdAt: -1 }); // Fetch with populated author name

          res.status(200).json(posts);
     } catch (error) {
          console.log("Error in fetching all the posts", error.message);
          res.status(500).json({ message: "Intenal Server Error" })
     }
}

export const getPerticularPost = async (req, res) => {
     try {
          // console.log(req.params.id);
          const post = await Post.findById(req.params.id).populate('author', 'fullName');

          res.status(200).json(post);
     } catch (error) {
          console.log("Error in fetching perticular post", error.message);
          res.status(500).json({ message: "Intenal Server Error" })
     }
}