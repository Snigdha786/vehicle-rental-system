module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bookings", {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      user_name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      vehicle_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: "vehicle", key: "id" }, // Matches Vehicle model
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      start_date: { 
        type: Sequelize.DATEONLY, 
        allowNull: false 
      },
      end_date: { 
        type: Sequelize.DATEONLY, 
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
    await queryInterface.dropTable("bookings");
  }
};
