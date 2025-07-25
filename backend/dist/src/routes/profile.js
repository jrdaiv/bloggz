"use strict";
// backend/src/routes/profile.ts
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
const Profile_1 = __importDefault(require("../models/Profile"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({ user: req.user.id }).populate("user", ["username", "email"]);
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found" });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
// Create or update profile
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { avatarUrl, bio, location, website, social } = req.body;
    const profileFields = {
        user: req.user.id,
        avatarUrl,
        bio,
        location,
        website,
        social,
    };
    try {
        let profile = yield Profile_1.default.findOne({ user: req.user.id });
        if (profile) {
            profile = yield Profile_1.default.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        profile = new Profile_1.default(profileFields);
        yield profile.save();
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}));
exports.default = router;
