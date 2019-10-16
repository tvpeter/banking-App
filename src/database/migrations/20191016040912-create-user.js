module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    gender: {
      allowNull: false,
      type: Sequelize.ENUM('male', 'female'),
    },
    dob: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    role: {
      allowNull: false,
      type: Sequelize.ENUM('admin', 'staff'),
      defaultValue: 'staff',
    },
    branchId: {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Branches',
        key: 'id',
      },
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('active', 'suspended'),
      defaultValue: 'active',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
};
