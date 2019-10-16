module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    dob: DataTypes.DATEONLY,
    status: DataTypes.ENUM('active', 'deleted'),
  }, {});
  Customer.associate = (models) => {
    Customer.hasMany(models.Account, {
      foreignKey: 'customerId',
      as: 'account',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Customer;
};