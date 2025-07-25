// backend/src/routes/profile.ts

import express from "express";
import Profile from "../models/Profile";
import authMiddleware from "../middleware/auth";
import User from "../models/User";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["username", "email"]);

    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create or update profile
router.post("/", authMiddleware, async (req, res) => {
  const { avatarUrl, bio, location, website, social } = req.body;

  const profileFields: any = {
    user: req.user.id,
    avatarUrl,
    bio,
    location,
    website,
    social,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
