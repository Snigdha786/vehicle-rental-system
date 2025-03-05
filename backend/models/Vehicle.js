import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import VehicleType from "./VehicleType.js";

const Vehicle = sequelize.define("vehicle", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: VehicleType, key: "id" } },
  model_name: { type: DataTypes.STRING, allowNull: false },
  availability_status: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

Vehicle.belongsTo(VehicleType, { foreignKey: "type_id" });

export default Vehicle;
