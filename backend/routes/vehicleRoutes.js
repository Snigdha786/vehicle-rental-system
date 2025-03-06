import express from "express";
import {
  getVehicleDetails,
  submitData,
} from "../controller/vehicleController.js";

const router = express.Router();

router.post("/submit", submitData);
router.get("/details", getVehicleDetails);

export default router;
