import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"
import e from "express";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import postRoutes from "./routes/post.route.js"

if(process.env.NODE_ENV !== "production"){
    dotenv.config({
        path:"./.env",
    });
}

const corsConfig = {
    origin:process.env.CLIENT_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}

const app = e()

app.use(e.json({ limit: '50mb' }));
app.use(e.urlencoded({ limit: '50mb', extended: true }));

app.use(e.json())
app.use(cookieParser())
app.use(cors(corsConfig))

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is lsitening on port:" + process.env.PORT);
    connectDB();
})