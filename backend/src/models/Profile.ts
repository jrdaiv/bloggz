// backend/src/models/Profile.ts

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // references the User model
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
    },
    { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
