"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/profile.ts
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// 🧠 Get logged-in user's profile
router.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Fetching profile for user:", req.user);
    try {
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select("-password");
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        console.error("Fetch profile error:", err);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}));
// 🛠️ Update logged-in user's profile
router.put("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const fields = ["name", "username", "email", "avatarUrl", "bio"];
        // 🧼 Collect and sanitize provided fields
        const updates = {};
        fields.forEach((field) => {
            var _a;
            const value = (_a = req.body[field]) === null || _a === void 0 ? void 0 : _a.trim();
            if (value)
                updates[field] = value;
        });
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No profile data provided" });
        }
        console.log("Updating profile with:", updates);
        const updatedUser = yield User_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b.id, { $set: updates }, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(req.user);
    }
    catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ error: "Profile update failed" });
    }
}));
exports.default = router;
