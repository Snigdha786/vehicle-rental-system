module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("vehicle_types", null, {});
    await queryInterface.bulkInsert("vehicle_types", [
      {
        wheels: 4,
        type_name: "Hatchback",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wheels: 4,
        type_name: "SUV",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wheels: 4,
        type_name: "Sedan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wheels: 2,
        type_name: "Cruiser",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        wheels: 2,
        type_name: "Sports",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("vehicle_types", null, {});
  },
};
