import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireRole("faculty"));

router.get("/dashboard", (req, res) => {
  res.json({ message: "Faculty dashboard", user: req.user });
});

export default router;
