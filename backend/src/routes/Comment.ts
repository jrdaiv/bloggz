// src/routes/comment.ts
import express from 'express';
import Comment from '../models/Comment';
import User from '../models/User';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.post('/comments', authMiddleware, async (req, res) => {
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

router.get('/comments/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/comments/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        // Check if the user is the author of the comment
        if (comment.userId.toString() !== req.user!.id) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await comment.deleteOne();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;

