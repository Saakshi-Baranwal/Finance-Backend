
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../utils/ApiError.js";

export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ name, email, password });

  const createdUser = await User.findById(user._id).select("-password");

  return createdUser;
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};