module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vehicle_type", {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      wheels: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
      },
      type_name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("vehicle_type");
  }
};
