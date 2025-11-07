import Assignment from "../models/Assignment.js";

export const createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, dueDate } = req.body;

    if (!title || !courseId) {
      return res.status(400).json({ error: "Title and course ID required" });
    }

    const attachments = req.files ? req.files.map(f => f.path) : [];

    const assignment = await Assignment.create({
      title,
      description,
      course: courseId,
      faculty: req.user._id,
      dueDate,
      attachments,
    });

    res.status(201).json({ message: "Assignment created", assignment });
  } catch (e) {
    console.error("Create assignment error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, studentId } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const fileUrl = req.files && req.files.length > 0 ? req.files[0].path : null;

    assignment.submissions.push({
      student: studentId,
      fileUrl,
      text,
    });

    await assignment.save();

    res.json({ message: "Assignment submitted", assignment });
  } catch (e) {
    console.error("Submit assignment error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const allFacultyAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ faculty: req.user._id })
      .populate("course", "name code")
      .populate("submissions.student", "name rollNo")
      .sort({ createdAt: -1 });

    res.json(assignments);
  } catch (e) {
    console.error("Get faculty assignments error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const allStudentAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("course", "name code")
      .populate("faculty", "name")
      .sort({ createdAt: -1 });

    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = assignment.submissions.find(
        sub => sub.student.toString() === req.user._id.toString()
      );
      return {
        ...assignment.toObject(),
        hasSubmitted: !!submission,
        submission,
      };
    });

    res.json(assignmentsWithStatus);
  } catch (e) {
    console.error("Get student assignments error:", e);
    res.status(500).json({ error: e.message });
  }
};
