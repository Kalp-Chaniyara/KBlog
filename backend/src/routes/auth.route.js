import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import { signup } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";
import { checkAuth } from "../controllers/user.controller.js";

const router = Router()

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.get("/check",validateToken,checkAuth)

export default router