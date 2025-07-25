import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import profileRoutes from "./routes/profile"
import userRoutes from "./routes/user";

dotenv.config();

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bloggz-1.onrender.com",
  "https://bloggz-5b8u.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(express.json());

console.log("Profile routes imported:", typeof profileRoutes);


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
try {
  app.use("/api/profile", profileRoutes);
} catch (err) {
  console.error("Failed to load profileRoutes:", err);
}
app.use((req, res, next) => {
  console.log(`[INCOMING] ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Backend is live!");
});

app.get('/api/test', (req, res) => res.json({ message: 'Proxy working' })); // Test route

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});