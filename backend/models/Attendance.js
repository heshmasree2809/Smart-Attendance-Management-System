import mongoose from "mongoose";
const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course:  { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  date:    { type: Date, default: Date.now },
  status:  { type: String, enum: ["Present", "Absent"], default: "Present" }
});
export default mongoose.model("Attendance", AttendanceSchema);
