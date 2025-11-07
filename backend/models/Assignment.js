import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: String,            // /uploads/filename.ext
  text: String,               // optional text answer
  submittedAt: { type: Date, default: Date.now },
  grade: String,              // e.g., A/B/C or marks
  remarks: String
});

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dueDate: Date,
  attachments: [String],      // optional files from faculty
  submissions: [SubmissionSchema]
}, { timestamps: true });

export default mongoose.model("Assignment", AssignmentSchema);
