module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("bookings", null, {});
    // Fetch the inserted vehicles to get their IDs
    const vehicles = await queryInterface.sequelize.query(
      "SELECT id, model_name FROM vehicle;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Map vehicles to their respective IDs
    const vehicleMap = {};
    vehicles.forEach(vehicle => {
      vehicleMap[vehicle.model_name] = vehicle.id;
    });

    // Insert bookings linked to vehicle IDs
    await queryInterface.bulkInsert("bookings", [
      { user_name: "John Doe", vehicle_id: vehicleMap["Swift"], start_date: "2024-03-10", end_date: "2024-03-15", created_at: new Date(), updated_at: new Date() },
      { user_name: "Alice Smith", vehicle_id: vehicleMap["Fortuner"], start_date: "2024-03-12", end_date: "2024-03-18", created_at: new Date(), updated_at: new Date() },
      { user_name: "Bob Johnson", vehicle_id: vehicleMap["Honda City"], start_date: "2024-03-20", end_date: "2024-03-25", created_at: new Date(), updated_at: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("bookings", null, {});
  }
};
