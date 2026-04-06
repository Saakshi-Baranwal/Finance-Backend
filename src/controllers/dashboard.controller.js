
import * as dashboardService from "../services/dashboard.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getSummary();

    res
      .status(200)
      .json(new ApiResponse(200, data, "Dashboard summary fetched"));
  } catch (err) {
    next(err);
  }
};