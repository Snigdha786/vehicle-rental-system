module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("vehicle", null, {});
    // Fetch the inserted vehicle types to get their IDs
    const vehicleTypes = await queryInterface.sequelize.query(
      "SELECT id, type_name FROM vehicle_type;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Map vehicle types to their respective IDs
    const vehicleTypeMap = {};
    vehicleTypes.forEach(type => {
      vehicleTypeMap[type.type_name] = type.id;
    });

    // Insert vehicles linked to vehicle types
    await queryInterface.bulkInsert("vehicle", [
      { type_id: vehicleTypeMap["Hatchback"], model_name: "Swift", availability_status: true, created_at: new Date(), updated_at: new Date() },
      { type_id: vehicleTypeMap["SUV"], model_name: "Fortuner", availability_status: false, created_at: new Date(), updated_at: new Date() },
      { type_id: vehicleTypeMap["Sedan"], model_name: "Honda City", availability_status: true, created_at: new Date(), updated_at: new Date() },
      { type_id: vehicleTypeMap["Cruiser"], model_name: "Harley Davidson", availability_status: false, created_at: new Date(), updated_at: new Date() },
      { type_id: vehicleTypeMap["Sports"], model_name: "Yamaha R1", availability_status: true, created_at: new Date(), updated_at: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("vehicle", null, {});
  }
};
