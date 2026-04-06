
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const getUsers = async () => {
  const users = await User.find().select("-password");

  return users;
};

export const updateRole = async (userId, role) => {
  const allowedRoles = ["viewer", "analyst", "admin"];

  if (!allowedRoles.includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};