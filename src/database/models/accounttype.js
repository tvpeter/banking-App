module.exports = (sequelize, DataTypes) => {
  const AccountType = sequelize.define('AccountType', {
    name: DataTypes.STRING,
  }, {});
  AccountType.associate = (models) => {
    AccountType.hasMany(models.Account, {
      foreignKey: 'accountTypeId',
      as: 'account',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return AccountType;
};
