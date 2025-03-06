import {
  submitBooking,
  getVehicleData,
} from "../services/vehicleDetailsService.js";

export const submitData = async (req, res) => {
  try {
    const response = await submitBooking(req.body);
    res.json({ message: "Data processed successfully", ...response });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getVehicleDetails = async (req, res) => {
  try {
    console.log("Received:", req.query);
    const data = await getVehicleData(req.query);
    res.json(data);
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    res.status(400).json({ error: error.message });
  }
};
