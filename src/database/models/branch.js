module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {});
  Branch.associate = (models) => {
    Branch.hasMany(models.User, {
      foreignKey: 'branchId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Branch.hasMany(models.Account, {
      foreignKey: 'branchId',
      as: 'branch',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Branch;
};
