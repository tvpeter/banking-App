'use strict';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    accountNumber: DataTypes.BIGINT,
    accountTypeId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL(13, 2)
  }, {});
  Account.associate = models => {
    Account.belongsTo(models.Customer, {
      foreignKey: 'branchId',
      as: 'branch',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Account.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Account.hasMany(models.Transaction, {
      foreignKey: 'accountNumber',
      as: 'transaction',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Account;
};