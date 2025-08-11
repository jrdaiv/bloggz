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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
console.log("User routes loaded"); // Debug log
// 🧪 Helper to log request source
router.use((req, res, next) => {
    console.log(`[USER ROUTES] ${req.method} ${req.originalUrl}`);
    next();
});
// Test route (static, should come first)
router.get('/test', (req, res) => {
    console.log("Test route hit");
    res.json({ message: "User route test endpoint" });
});
// 📥 Get all users (excluding passwords)
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select("-password");
        res.status(200).json(users);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}));
// Get Profile
router.get('/profile', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Profile GET route hit", req.user);
        if (!req.user || typeof req.user.id !== "string") {
            throw new Error("Invalid user object in request");
        }
        const user = yield User_1.default.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.error("Profile GET error:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}));
// Edit Profile
router.put('/profile', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, bio, avatarUrl } = req.body;
    try {
        console.log("Profile PUT route hit", req.user);
        const user = yield User_1.default.findByIdAndUpdate(req.user.id, { username, bio: bio || '', avatarUrl: avatarUrl || '' }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.error("Profile PUT error:", err);
        res.status(500).send('Server error');
    }
}));
// 🔍 Get single user by MongoDB ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}));
exports.default = router;
