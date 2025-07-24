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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../src/models/User"));
dotenv_1.default.config(); // Make sure your .env has MONGO_URI
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        // 🛠️ Update all users with missing fields
        const result = yield User_1.default.updateMany({}, // Match all documents
        {
            $set: {
                avatarUrl: "",
                bio: "", // Add default bio
            },
        });
        console.log(`✅ Updated ${result.modifiedCount} user(s)`);
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Migration failed:", err);
        process.exit(1);
    }
}))();
