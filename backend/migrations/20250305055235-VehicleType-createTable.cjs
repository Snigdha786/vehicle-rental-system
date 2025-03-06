module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vehicle_types", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      wheels: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type_name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      `ALTER TABLE vehicle_types AUTO_INCREMENT = 100;`,
    );
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("vehicle_types");
  },
};
