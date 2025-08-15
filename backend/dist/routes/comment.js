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
// src/routes/comment.ts
const express_1 = __importDefault(require("express"));
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
console.log('Comment router initialized');
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received comment creation request:", req.body);
    console.log('Auth middleware user:', req.user);
    console.log('POST /api/comments hit - Body:', req.body, 'User:', req.user);
    const { postId, content } = req.body;
    if (!postId || !content) {
        return res.status(400).json({ message: "Post ID and content are required" });
    }
    try {
        // Find the user making the comment
        const user = yield User_1.default.findById(req.user.id).select("username");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const comment = new Comment_1.default({
            postId,
            userId: req.user.id,
            author: user.username,
            content
        });
        yield comment.save();
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /api/comments/:postId hit - postId:', req.params.postId);
    console.log("Fetching comments for postId:", req.params.postId);
    const { postId } = req.params;
    try {
        const comments = yield Comment_1.default.find({ postId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.delete('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('DELETE hit - id:', id, 'User from token:', req.user);
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.log("Invalid comment ID format:", id);
            return res.status(400).json({ message: "Invalid comment ID" });
        }
        const comment = yield Comment_1.default.findById(id);
        if (!comment) {
            console.log("Comment not found in DB for id:", id);
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.userId.toString() !== req.user.id) {
            console.log("User not authorized to delete this comment.");
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }
        yield comment.deleteOne();
        console.log("Comment deleted successfully:", id);
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
