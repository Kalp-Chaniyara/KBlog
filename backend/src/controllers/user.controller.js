import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateAccesstoken from "../lib/token.js";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if (!email || !fullName || !password)
            return res.status(400).json("All Fields are required")
        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters long" });

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = bcrypt.genSaltSync(10);

        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        });

        if (newUser) {
            //generate token
            const token = generateAccesstoken(newUser._id);

            res.cookie("tokenStorer", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            await newUser.save()

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                message: "User signed up successfully"
            });
        } else {
            return res.status(400).json({ message: "Invalis user data" });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password)
            return res.status(400).json("All Fields are required")

        if (password.length < 6)
            return res.status(400).json({ message: "Password must be at least 6 characters long" });

        const user = await User.findOne({ email });
        // console.log("DONE, User found: ", user);

        if (!user) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // console.log("isPasswordCorrect",isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = generateAccesstoken(user._id)
        // console.log("Done MIddlweware");

        res.cookie("tokenStorer", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            message: "User loged in successfully"
        });
    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error 2" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("tokenStorer", "", {
            maxAge: 0
        });

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}