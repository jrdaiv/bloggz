import express, { Router, Request, Response } from "express";
import User from "../models/User";
import auth from "../middleware/auth"; // Ensure this path is correct

const router: Router = express.Router();

console.log("User routes loaded"); // Debug log

// 🧪 Helper to log request source
router.use((req: Request, res: Response, next) => {
  console.log(`[USER ROUTES] ${req.method} ${req.originalUrl}`);
  next();
});

// 📥 Get all users (excluding passwords)
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// 🔍 Get single user by MongoDB ID
router.get("/:id", async (req: Request, res: Response) => {
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
router.get('/profile', auth, async (req: Request, res: Response) => {
  try {
    console.log("Profile GET route hit", req.user); // Debug log
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Profile GET error:", err);
    res.status(500).send('Server error');
  }
});

// Edit Profile
router.put('/profile', auth, async (req: Request, res: Response) => {
  const { username, bio, avatarUrl } = req.body;
  try {
    console.log("Profile PUT route hit", req.user); // Debug log
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, bio: bio || '', avatarUrl: avatarUrl || '' },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Profile PUT error:", err);
    res.status(500).send('Server error');
  }
});

export default router;