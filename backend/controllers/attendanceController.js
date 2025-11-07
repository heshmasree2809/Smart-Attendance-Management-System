import Attendance from "../models/Attendance.js";
import crypto from "crypto";

const qrCodes = new Map();

export const generateQR = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    if (!courseId) {
      return res.status(400).json({ error: "Course ID required" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    qrCodes.set(token, { courseId, facultyId: req.user._id, expiresAt });

    res.json({ token, expiresAt });
  } catch (e) {
    console.error("Generate QR error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const scanQR = async (req, res) => {
  try {
    const { token, studentId } = req.body;

    if (!token || !studentId) {
      return res.status(400).json({ error: "Token and student ID required" });
    }

    const qrData = qrCodes.get(token);
    
    if (!qrData) {
      return res.status(404).json({ error: "Invalid QR code" });
    }

    if (Date.now() > qrData.expiresAt) {
      qrCodes.delete(token);
      return res.status(400).json({ error: "QR code expired" });
    }

    const attendance = await Attendance.create({
      student: studentId,
      course: qrData.courseId,
      status: "Present",
    });

    res.json({ message: "Attendance marked", attendance });
  } catch (e) {
    console.error("Scan QR error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { studentId, courseId, status } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ error: "Student ID and course ID required" });
    }

    const attendance = await Attendance.create({
      student: studentId,
      course: courseId,
      status: status || "Present",
    });

    res.json({ message: "Attendance marked", attendance });
  } catch (e) {
    console.error("Mark attendance error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const getByFaculty = async (req, res) => {
  try {
    const { courseId } = req.query;
    
    const query = courseId ? { course: courseId } : {};
    const attendance = await Attendance.find(query)
      .populate("student", "name rollNo")
      .populate("course", "name code")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (e) {
    console.error("Get faculty attendance error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const getByStudent = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.user._id })
      .populate("course", "name code")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (e) {
    console.error("Get student attendance error:", e);
    res.status(500).json({ error: e.message });
  }
};
