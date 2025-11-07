import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { generateQR, scanQR, markAttendance, getByFaculty, getByStudent } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/generate", requireAuth, generateQR);
router.post("/scan", scanQR);
router.post("/mark", requireAuth, markAttendance);

router.get("/faculty", requireAuth, getByFaculty);
router.get("/student", requireAuth, getByStudent);

export default router;
