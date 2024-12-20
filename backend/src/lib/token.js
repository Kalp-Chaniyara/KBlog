import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const generateAccesstoken = (userId)=>{
    return jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"7d"});
}

export default generateAccesstoken