
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

  
    if (decoded.version !== user.tokenVersion) {
      return res.status(401).json({
        message: "Token expired due to logout"
      });
    }

    req.user = user;

    next();
  } catch (err) {
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