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
// backend/src/routes/user.ts
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select("-password");
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}));
// 📌 Get single user by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id).select("-password");
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
}));
exports.default = router;
