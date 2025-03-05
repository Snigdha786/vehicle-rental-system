import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

dotenv.config();

const app = express();
app.use(express.json());

// Import models to sync tables
import "./Models/VehicleType.js";
import "./Models/Vehicle.js";
import "./Models/Booking.js";


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
