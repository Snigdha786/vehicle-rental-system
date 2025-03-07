import { Op } from "sequelize";
import VehicleType from "../models/VehicleType.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

/**
 * Submits booking data after checking availability.
 */
export const submitBooking = async ({
  firstName,
  lastName,
  wheels,
  vehicleType,
  model,
  dateRange,
}) => {
  try {
  console.log("Processing Booking:", {
    firstName,
    lastName,
    wheels,
    vehicleType,
    model,
    dateRange,
  });

    if (!dateRange.start || !dateRange.end) {
      throw new Error("Date Range is required");
    }

  const vehicleModel = await Vehicle.findOne({
    where: { model_name: model },
    attributes: ["id"],
  });

  if (!vehicleModel) {
    throw new Error("Vehicle model not found");
  }

  const bookingExists = await Booking.findOne({
    where: {
      vehicle_id: vehicleModel.id,
      start_date: { [Op.lte]: dateRange.end },
      end_date: { [Op.gte]: dateRange.start },
    },
  });

  if (bookingExists) {
    return { successFlag: false };
  }

  await Booking.create({
    user_name: `${firstName} ${lastName}`,
    vehicle_id: vehicleModel.id,
    start_date: dateRange.start,
    end_date: dateRange.end,
  });

  return { successFlag: true };
  } catch (error) {
    console.error("Error in submitBooking:", error.message);
    return { successFlag: false, error: error.message };
  }
};

/**
 * Fetches vehicle types and models based on user input.
 */
export const getVehicleData = async ({ wheels, vehicleType}) => {
  try {
  const vehicleWheels = await VehicleType.findAll({
        attributes: ["wheels"],
        group: ["wheels"],
        raw: true
  });  

  const vehicleTypes = await VehicleType.findAll({
    where: { wheels },
    attributes: ["type_name"],
  });

  let vehicleModels = [];
  if (vehicleType) {
    const vehicle = await VehicleType.findOne({
      where: { type_name: vehicleType },
      attributes: ["id"],
    });

    if (vehicle) {
      vehicleModels = await Vehicle.findAll({
        where: { type_id: vehicle.id },
        attributes: ["model_name"],
      });
    }
  }

  return { vehicleTypes, vehicleModels,vehicleWheels };
  } catch (error) {
    console.error("Error in getVehicleData:", error.message);
    return { error: error.message };
  }
};

/**
 * Handles form validation
 */
export const validateForm = async (requestParams) => {
    console.log("Validating Form:", requestParams);
    const { firstName, lastName, wheels, vehicleType, model, dateRange, step } = requestParams;

    if (step === "0") {
      if (!firstName || !lastName) {
        throw new Error("First Name and Last Name are required");
      }
    }
    if (step === "1") {
      if (!wheels) {
        throw new Error("Wheels is required");
      }
    }
    if (step === "2") {
      if (!vehicleType) {
        throw new Error("Vehicle Type is required");
      }
    }
    if (step === "3") {
      if (!model) {
        throw new Error("Model is required");
      }
    }
  
};
