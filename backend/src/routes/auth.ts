// backend/src/routes/auth.ts
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  console.log("Registration request received at:", new Date().toISOString(), "with body:", req.body);
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "Email or username already exists" });
    }
    const user = new User({ name, username, email, password });
    await user.save();
    console.log("User saved:", user._id)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Login request received at:", new Date().toISOString(), "with body:", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: "Login failed" });
  }
});

export default router;