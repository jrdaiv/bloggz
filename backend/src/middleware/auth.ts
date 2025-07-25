import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log("🔐 Middleware triggered");

  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log("🪪 Decoded Token:", decoded);

    let userId: string | undefined;
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      userId = (decoded as { id: string }).id;
    }

    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    console.log("✅ User attached to request:", req.user);

    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Token verification failed:", err.message);
    } else {
      console.error("❌ Token verification failed:", err);
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default authMiddleware;
