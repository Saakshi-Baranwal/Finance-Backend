
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";


const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      version: user.tokenVersion 
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};


const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );
};


export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ name, email, password });

  return await User.findById(user._id).select("-password");
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

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);


  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};


export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token required");
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken };
};


export const logout = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }


  user.tokenVersion += 1;
  user.refreshToken = null;

  await user.save();
};