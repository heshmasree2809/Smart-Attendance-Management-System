import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (e) {
    console.error("Get users error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, rollNo, year, department, facultyId, specialization } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
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
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ message: "User created", user: userResponse });
  } catch (e) {
    console.error("Create user error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated", user });
  } catch (e) {
    console.error("Update user error:", e);
    res.status(500).json({ error: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (e) {
    console.error("Delete user error:", e);
    res.status(500).json({ error: e.message });
  }
};
