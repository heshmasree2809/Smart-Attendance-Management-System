import express from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.js";
import {
  createAssignment,
  submitAssignment,
  allFacultyAssignments,
  allStudentAssignments,
} from "../controllers/assignmentController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/create", requireAuth, upload.array("files"), createAssignment);
router.post("/submit/:id", requireAuth, upload.array("files"), submitAssignment);

router.get("/faculty", requireAuth, allFacultyAssignments);
router.get("/student", requireAuth, allStudentAssignments);

export default router;
