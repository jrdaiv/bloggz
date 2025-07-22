// backend/src/routes/posts.ts
import express from "express";
import Post from "../models/Post";
import authMiddleware from "../middleware/auth";


const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch posts" });
  }
});

// Get single posts
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "Invalid post ID"});
  }
})

// Create a post (protected route)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    // @ts-ignore
    const user = req.user;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const post = new Post({ title, content, author: user.username });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

// Update post by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // @ts-ignore
    if (post.author !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to edit this post" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Delete post by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // @ts-ignore
    if (post.author !== req.user.username) {
      return res.status(403).json({ error: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});






export default router;