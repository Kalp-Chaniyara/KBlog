import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies.tokenStorer;

        if (!token)
            return res.status(401).json({ message: "Invalid: No token provided" });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded)
            return res.status(400).json({ message: "Invalid token" });

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized- User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in validateToken middleware: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}