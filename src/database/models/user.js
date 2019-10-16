module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    password: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    role: DataTypes.ENUM('admin', 'staff'),
    status: DataTypes.ENUM('active', 'suspended'),
    branchId: DataTypes.INTEGER,
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.Branch, {
      foreignKey: 'branchId',
      as: 'branch',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Account, {
      foreignKey: 'userId',
      as: 'account',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'transaction',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return User;
};