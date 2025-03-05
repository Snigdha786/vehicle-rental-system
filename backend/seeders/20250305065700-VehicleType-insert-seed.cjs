module.exports = {
 
  up: async (queryInterface) => {
    await queryInterface.bulkDelete("vehicle_type", null, {});
    await queryInterface.bulkInsert("vehicle_type", [
      { wheels: 4, type_name: "Hatchback", created_at: new Date(), updated_at: new Date() },
      {  wheels: 4, type_name: "SUV", created_at: new Date(), updated_at: new Date() },
      {  wheels: 4, type_name: "Sedan", created_at: new Date(), updated_at: new Date() },
      {  wheels: 2, type_name: "Cruiser", created_at: new Date(), updated_at: new Date() },
      {  wheels: 2, type_name: "Sports", created_at: new Date(), updated_at: new Date() }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("vehicle_type", null, {});
  }
};
