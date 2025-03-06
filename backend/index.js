import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cors from "cors";
import bodyParser from "body-parser";

import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Import models to sync tables
import "./models/VehicleType.js";
import "./models/Vehicle.js";
import "./models/Booking.js";

app.use(cors());
app.use(bodyParser.json());

app.use("/api/vehicles", vehicleRoutes);

// Connect to MySQL and Start Server
const PORT = process.env.PORT || 5000;
sequelize
  .authenticate() // Check database connection
  .then(() => {
    console.log("Connected to MySQL Database successfully!");
    return sequelize.sync(); // Ensure tables are created
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection failed:", err));
