import mongoose from "mongoose";
const NoticeSchema = new mongoose.Schema({
  title: String,
  body: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
export default mongoose.model("Notice", NoticeSchema);
