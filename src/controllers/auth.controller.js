
import * as authService from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    res
      .status(200)
      .json(new ApiResponse(200, data, "Login successful"));
  } catch (err) {
    next(err);
  }
};


export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const data = await authService.refreshAccessToken(refreshToken);

    res
      .status(200)
      .json(new ApiResponse(200, data, "Access token refreshed"));
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Logged out successfully"));
  } catch (err) {
    next(err);
  }
};