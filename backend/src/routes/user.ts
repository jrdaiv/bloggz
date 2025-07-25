// backend/src/routes/user.ts
import express from "express";
import User from "../models/User";
const router = express.Router();

// 🧪 Helper to log request source
router.use((req, res, next) => {
  console.log(`[USER ROUTES] ${req.method} ${req.originalUrl}`);
  next();
});

// 📥 Get all users (excluding passwords)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🔍 Get single user by MongoDB ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;