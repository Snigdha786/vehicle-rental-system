module.exports =  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vehicle", {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      type_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: { model: "vehicle_type", key: "id" }, // Matches VehicleType model
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      model_name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      availability_status: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: true 
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
    await queryInterface.dropTable("vehicle");
  }
};
