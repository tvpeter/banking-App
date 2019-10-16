'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    type: DataTypes.ENUM('credit', 'debit'),
    accountNumber: DataTypes.BIGINT,
    userId: DataTypes.BIGINT,
    description: DataTypes.STRING
  }, {});
  Transaction.associate = models => {
    Transaction.belongsTo(models.Account, {
      foreignKey: 'accountNumber',
      as: 'account',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    Transaction.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };
  return Transaction;
};