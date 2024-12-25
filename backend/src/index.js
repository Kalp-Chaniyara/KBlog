import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"
import e from "express";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import postRoutes from "./routes/post.route.js"
import path from "path";

dotenv.config()
connectDB();
const PORT = process.env.PORT || 8080
const app = e()

const _dirname = path.resolve();

app.use(e.json({ limit: '50mb' }));
app.use(e.urlencoded({ limit: '50mb', extended: true }));
app.use(e.json())
app.use(cookieParser())
const corsConfig = {
    origin:"https://kblog14.netlify.app",
    credentials:true,
}
app.use(cors(corsConfig))

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)

app.use(e.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

app.listen(PORT,()=>{
    console.log("server is lsitening on port:" + PORT);
})