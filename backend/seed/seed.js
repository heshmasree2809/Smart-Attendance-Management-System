import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Notice from "../models/Notice.js";

dotenv.config();

await connectDB();

await User.deleteMany({});
await Course.deleteMany({});
await Notice.deleteMany({});

const admin = await User.create({ name: "Admin", email: "admin@scaams.com", password: "admin123", role: "admin" });
const fac   = await User.create({ name: "Dr. Rao", email: "faculty@scaams.com", password: "faculty123", role: "faculty" });
const stu   = await User.create({ name: "Kavya", email: "student@scaams.com", password: "student123", role: "student", rollNo: "21A21A05B1", year: "3rd" });

const dbms = await Course.create({ code: "CS301", name: "DBMS", faculty: fac._id });
const os   = await Course.create({ code: "CS302", name: "OS",   faculty: fac._id });

await Notice.create({ title: "Welcome", body: "SCAAMS is live!", postedBy: admin._id });

console.log("Seeded. Users:", { admin: admin.email, fac: fac.email, stu: stu.email });
process.exit(0);
