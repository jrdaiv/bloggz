// backend/src/routes/user.ts
import express from "express";
import User from "../models/User";
import auth from "./auth";
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

// Get Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Edit Profile
router.put('/profile', auth, async (req, res) => {
  const { username, bio, avatarUrl } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, bio: bio || '', avatarUrl: avatarUrl || '' },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;