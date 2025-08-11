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
// backend/src/routes/posts.ts
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../models/Post"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Get all posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to fetch posts" });
    }
}));
// Get single posts
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: "Invalid post ID" });
    }
}));
// Create a post (protected route)
router.post("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        // @ts-ignore
        const user = req.user;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }
        if (!user || !user.username) {
            return res.status(401).json({ error: "Unauthorized: user not found" });
        }
        const post = new Post_1.default({ title, content, author: user.username });
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: "Failed to create post" });
    }
}));
// Update post by ID
router.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = yield Post_1.default.findById(id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        // @ts-ignore
        if (post.author !== req.user.username) {
            return res.status(403).json({ error: "Unauthorized to edit this post" });
        }
        post.title = title;
        post.content = content;
        yield post.save();
        res.json({ message: "Post updated successfully", post });
    }
    catch (err) {
        console.error("Error updating post:", err);
        res.status(500).json({ error: "Server error" });
    }
}));
// Delete post by ID
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Post_1.default.findById(id);
        if (!post)
            return res.status(404).json({ error: "Post not found" });
        // @ts-ignore
        if (post.author !== req.user.username) {
            return res.status(403).json({ error: "Not authorized to delete this post" });
        }
        yield post.deleteOne();
        res.json({ message: "Post deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete post" });
    }
}));
exports.default = router;
