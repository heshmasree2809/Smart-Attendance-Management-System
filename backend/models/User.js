import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "faculty", "admin"], required: true },

  // student fields
  rollNo: String,
  year: String,
  department: String,

  // faculty fields
  facultyId: String,
  specialization: String,
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
