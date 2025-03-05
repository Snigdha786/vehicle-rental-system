import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Vehicle from "./Vehicle.js";

const Booking = sequelize.define("bookings", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_name: { type: DataTypes.STRING, allowNull: false },
  vehicle_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Vehicle, key: "id" } },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  end_date: { type: DataTypes.DATEONLY, allowNull: false }
}, { timestamps: true });

Booking.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

export default Booking;
