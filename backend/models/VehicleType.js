import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const VehicleType = sequelize.define(
  "vehicle_types",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    wheels: { type: DataTypes.INTEGER, allowNull: false },
    type_name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, underscored: true },
);

export default VehicleType;
