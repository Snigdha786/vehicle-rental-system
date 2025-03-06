module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vehicles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "vehicle_types", key: "id" }, // Matches VehicleType model
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      model_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      availability_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.sequelize.query(
      `ALTER TABLE vehicles AUTO_INCREMENT = 200;`,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("vehicles");
  },
};
