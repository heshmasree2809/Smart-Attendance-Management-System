import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role, rollNo, year, department, facultyId, specialization } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hash,
      role,
    };

    if (role === "student") {
      userData.rollNo = rollNo;
      userData.year = year;
      userData.department = department;
    } else if (role === "faculty") {
      userData.facultyId = facultyId;
      userData.specialization = specialization;
      userData.department = department;
    }

    const user = await User.create(userData);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: userResponse,
    });
  } catch (e) {
    console.error("Register error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (e) {
    console.error("Profile error:", e);
    res.status(500).json({ error: e.message });
  }
};
