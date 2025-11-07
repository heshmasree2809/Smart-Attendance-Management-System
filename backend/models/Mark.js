import mongoose from "mongoose";
const MarkSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course:  { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  internal: { type: Number, default: 0 },
  external: { type: Number, default: 0 }
}, { timestamps: true });

MarkSchema.virtual("total").get(function(){ return this.internal + this.external; });
MarkSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Mark", MarkSchema);
