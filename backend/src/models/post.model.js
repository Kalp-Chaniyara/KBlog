import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
     title:{
          type:String,
          required:true,
     },
     categoryOfPost:{
          type:String,
          required:true
     },
     summary:{
          type:String,
          required:true
     },
     image:{
          type:String,
     },
     discription:{
          type:String,
          required:true
     },
     author:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
     }
},{timestamps:true})

const Post = mongoose.model("Post",PostSchema)

export default Post