import mongoose from "mongoose";
const TimetableSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // or by batch/section if you prefer
  week: [{
    day: String, // Mon, Tue...
    slots: [{ time: String, course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, room: String }]
  }]
});
export default mongoose.model("Timetable", TimetableSchema);
