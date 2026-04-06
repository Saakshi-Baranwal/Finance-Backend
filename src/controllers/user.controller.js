
import * as userService from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const user = await userService.updateRole(
      req.params.id,
      req.body.role
    );

    res
      .status(200)
      .json(new ApiResponse(200, user, "User role updated successfully"));
  } catch (err) {
    next(err);
  }
};