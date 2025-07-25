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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("🔐 Middleware triggered");
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("🪪 Decoded Token:", decoded);
        let userId;
        if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
            userId = decoded.id;
        }
        if (!userId) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        const user = yield User_1.default.findById(userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        req.user = user;
        console.log("✅ User attached to request:", req.user);
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("❌ Token verification failed:", err.message);
        }
        else {
            console.error("❌ Token verification failed:", err);
        }
        return res.status(401).json({ message: "Invalid token" });
    }
});
exports.default = authMiddleware;
