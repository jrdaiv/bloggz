"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const posts_1 = __importDefault(require("./routes/posts"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)({ origin: "https://bloggz-5b8u.onrender.com", credentials: true }));
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`[INCOMING] ${req.method} ${req.url}`);
    next();
});
app.use("/api/auth", auth_1.default);
app.use("/api/posts", posts_1.default);
app.get("/", (req, res) => {
    res.send("Backend is live!");
});
app.get('/api/test', (req, res) => res.json({ message: 'Proxy working' })); // Test route
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
