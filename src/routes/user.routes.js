import express from "express";
import { getUsers, updateUserRole } from "../controllers/user.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getUsers);
router.patch("/:id/role", protect, authorize("admin"), updateUserRole);

export default router;