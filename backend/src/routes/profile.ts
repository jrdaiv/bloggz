// backend/src/routes/profile.ts
import express from "express";
import User from "../models/User";
import authMiddleware from "../middleware/auth";

const router = express.Router();

// 🔒 Type-safe request interface for authenticated user
type UserPayload = {
    id: string;
    username: string;
    // Add other fields if used elsewhere (e.g., email, roles)
};

interface AuthenticatedRequest extends express.Request {
    user?: UserPayload;
}

// 🧠 Get logged-in user's profile
router.get("/me", authMiddleware, async (req: AuthenticatedRequest, res) => {
    console.log("Fetching profile for user:", req.user);

    try {
        const user = await User.findById(req.user?.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        console.error("Fetch profile error:", err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
});

// 🛠️ Update logged-in user's profile
router.put("/me", authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
        const fields = ["name", "username", "email", "avatarUrl", "bio"];

        // 🧼 Collect and sanitize provided fields
        const updates: Record<string, string> = {};
        fields.forEach((field) => {
            const value = req.body[field]?.trim();
            if (value) updates[field] = value;
        });

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No profile data provided" });
        }

        console.log("Updating profile with:", updates);

        const updatedUser = await User.findByIdAndUpdate(
            req.user?.id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(req.user);
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ error: "Profile update failed" });
    }
});

export default router;