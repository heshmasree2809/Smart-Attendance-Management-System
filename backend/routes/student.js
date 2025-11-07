import express from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireRole("student"));

router.get("/dashboard", (req, res) => {
  res.json({ message: "Student dashboard", user: req.user });
});

export default router;
