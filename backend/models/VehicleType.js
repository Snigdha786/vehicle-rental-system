import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VehicleType = sequelize.define("vehicle_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  wheels: { type: DataTypes.INTEGER, allowNull: false },
  type_name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

export default VehicleType;
