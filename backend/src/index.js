import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"
import e from "express";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import postRoutes from "./routes/post.route.js"

dotenv.config()

const app = e()

const PORT = process.env.PORT || 8001

app.use(e.json({ limit: '50mb' }));
app.use(e.urlencoded({ limit: '50mb', extended: true }));

app.use(e.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)

app.listen(PORT,()=>{
    console.log("server is lsitening on port:" + PORT);
    connectDB();
})