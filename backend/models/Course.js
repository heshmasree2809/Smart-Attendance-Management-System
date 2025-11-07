import mongoose from "mongoose";
const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
export default mongoose.model("Course", CourseSchema);
