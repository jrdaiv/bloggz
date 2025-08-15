import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../src/models/Post";

dotenv.config();

mongoose.connect(process.env.MONGO_URI as string);

const addCommentsField = async () => {
  try {
    await Post.updateMany(
      {},
      { $set: { comments: [] } }
    );
    console.log("Comments field added successfully");
  } catch (error) {
    console.error("Error adding comments field:", error);
  } finally {
    mongoose.connection.close();
  }
};

addCommentsField();
