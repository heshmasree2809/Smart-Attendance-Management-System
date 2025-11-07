import express from "express";
import { login, register, profile } from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", requireAuth, profile);

export default router;
