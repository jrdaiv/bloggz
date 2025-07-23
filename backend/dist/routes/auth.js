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
// backend/src/routes/auth.ts
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// Register
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Registration request received at:", new Date().toISOString(), "with body:", req.body);
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingUser = yield User_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or username already exists" });
        }
        const user = new User_1.default({ name, username, email, password });
        yield user.save();
        console.log("User saved:", user._id);
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({ error: "Registration failed" });
    }
}));
// Login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login request received at:", new Date().toISOString(), "with body:", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: "Login failed" });
    }
}));
exports.default = router;
