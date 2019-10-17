'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.ENUM('credit', 'debit'),
      allowNull: false
    },
    accountNumber: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'accountNumber'
      }
    },
    userId: {
      type: Sequelize.BIGINT,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    amount: {
      type: Sequelize.DataTypes.DECIMAL(13, 2),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transactions')
};