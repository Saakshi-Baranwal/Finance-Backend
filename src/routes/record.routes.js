
import express from "express";
import * as recordCtrl from "../controllers/record.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("viewer", "analyst", "admin"),
  recordCtrl.getRecords
);

router.post(
  "/",
  protect,
  authorize("admin"),
  recordCtrl.createRecord
);

router.patch(
  "/:id",
  protect,
  authorize("admin"),
  recordCtrl.updateRecord
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  recordCtrl.deleteRecord
);


export default router; 