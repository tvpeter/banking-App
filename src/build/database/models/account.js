'use strict';

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    accountNumber: DataTypes.BIGINT,
    accountTypeId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER,
    staffId: DataTypes.INTEGER
  }, {});
  Account.associate = models => {
    Account.belongsTo(models.Customer, {
      foreignKey: 'branchId',
      as: 'branch',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Account.hasMany(models.Account, {
      foreignKey: 'staffId',
      as: 'account',
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