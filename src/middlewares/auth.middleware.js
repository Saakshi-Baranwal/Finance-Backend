
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Not authorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};


export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: Access denied",
      });
    }
    next();
  };
};