import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User";

dotenv.config(); // Make sure your .env has MONGO_URI

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    // 🛠️ Update all users with missing fields
    const result = await User.updateMany(
      {}, // Match all documents
      {
        $set: {
          avatarUrl: "", // Add default avatarUrl
          bio: "",       // Add default bio
        },
      }
    );

    console.log(`✅ Updated ${result.modifiedCount} user(s)`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();