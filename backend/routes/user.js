import express from "express";
import { register, verifyOTP, login, getProfile } from "../controllers/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

export default router;
