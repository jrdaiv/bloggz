// src/routes/comment.ts
import express from 'express';
import Comment from '../models/Comment';
import User from '../models/User';
import authMiddleware from '../middleware/auth';
import mongoose from 'mongoose';

const router = express.Router();

console.log('Comment router initialized');

router.post('/', authMiddleware, async (req, res) => {
    console.log("Received comment creation request:", req.body);
    console.log('Auth middleware user:', req.user);
    console.log('POST /api/comments hit - Body:', req.body, 'User:', req.user);
    const { postId, content } = req.body;

    if (!postId || !content) {
        return res.status(400).json({ message: "Post ID and content are required" });
    }

    try {
        // Find the user making the comment
        const user = await User.findById(req.user!.id).select("username");
        if (!user) return res.status(404).json({ message: "User not found" });

        const comment = new Comment({
            postId,
            userId: req.user!.id,
            author: user.username,
            content
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:postId', async (req, res) => {
    console.log('GET /api/comments/:postId hit - postId:', req.params.postId);
    console.log("Fetching comments for postId:", req.params.postId);
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    console.log('DELETE hit - id:', id, 'User from token:', req.user);

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid comment ID format:", id);
            return res.status(400).json({ message: "Invalid comment ID" });
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            console.log("Comment not found in DB for id:", id);
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== req.user!.id) {
            console.log("User not authorized to delete this comment.");
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await comment.deleteOne();
        console.log("Comment deleted successfully:", id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting comment:", error);
        res.status(400).json({ error: error.message });
    }
});



export default router;
