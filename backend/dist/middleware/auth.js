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
    const authHeader = req.get('Authorization');
    const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')) ? authHeader.replace('Bearer ', '') : undefined;
    if (!token) {
        console.log('No token provided for request:', req.method, req.url);
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT_SECRET is not defined');
            throw new Error('JWT_SECRET is not defined');
        }
        console.log('Verifying token:', token); // Debug token
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        console.log('Decoded token:', decoded); // Debug decoded payload
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            console.log(`User not found for ID: ${decoded.id}`);
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.log('Authenticated user:', { id: user._id.toString(), username: user.username });
        req.user = { id: user._id.toString(), username: user.username };
        next();
    }
    catch (error) {
        console.error('Token verification error:', error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
});
exports.default = authMiddleware;
