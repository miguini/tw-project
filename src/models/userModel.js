const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

let User;

if (sequelize) {
  User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00, // Balance inicial del usuario
    }
  });
}

module.exports = User || {};
