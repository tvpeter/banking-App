'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Customers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    phone: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    gender: {
      allowNull: false,
      type: Sequelize.ENUM('male', 'female')
    },
    dob: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    status: {
      allowNull: false,
      type: Sequelize.ENUM('active', 'deleted'),
      defaultValue: 'active'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }
  }),
  down: queryInterface => queryInterface.dropTable('Customers')
};