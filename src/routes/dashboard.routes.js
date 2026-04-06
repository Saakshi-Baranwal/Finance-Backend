import express from "express";
import { getSummary } from "../controllers/dashboard.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.get(
  "/summary",
  protect,
  authorize("analyst", "admin"),
  getSummary
)

export default router;