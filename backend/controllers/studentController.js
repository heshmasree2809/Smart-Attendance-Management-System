import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import Assignment from "../models/Assignment.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (e) {
    console.error("Get profile error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;

    const attendanceCount = await Attendance.countDocuments({ 
      student: studentId, 
      status: "Present" 
    });

    const assignments = await Assignment.find()
      .populate("course", "name");

    const submittedCount = assignments.filter(a => 
      a.submissions.some(s => s.student.toString() === studentId.toString())
    ).length;

    res.json({
      attendance: attendanceCount,
      assignmentsTotal: assignments.length,
      assignmentsSubmitted: submittedCount,
    });
  } catch (e) {
    console.error("Get dashboard error:", e);
    res.status(500).json({ error: e.message });
  }
};
