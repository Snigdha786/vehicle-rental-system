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
  console.log("Processing Booking:", {
    firstName,
    lastName,
    wheels,
    vehicleType,
    model,
    dateRange,
  });

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
};

/**
 * Fetches vehicle types and models based on user input.
 */
export const getVehicleData = async ({ wheels, vehicleType}) => {

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
};


/**
 * Handles form validatation
 */
// export const validateForm= async ({ }) => {

//   };
