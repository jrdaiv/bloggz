"use strict";
// backend/src/models/Profile.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    avatarUrl: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    website: {
        type: String,
        default: "",
    },
    social: {
        twitter: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
    },
}, { timestamps: true });
const Profile = mongoose_1.default.model("Profile", profileSchema);
exports.default = Profile;
