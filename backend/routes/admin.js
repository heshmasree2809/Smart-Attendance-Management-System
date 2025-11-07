import express from "express";
import { allUsers, createUser, updateUser, deleteUser } from "../controllers/adminController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);
router.use(requireRole("admin"));

router.get("/users", allUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
