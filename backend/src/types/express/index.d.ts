// types/express/index.d.ts
import { User } from "../../models/User"; // Adjust to your actual User type

declare global {
  namespace Express {
    interface Request {
      user?: User; // Use the correct type of your user document
    }
  }
}
