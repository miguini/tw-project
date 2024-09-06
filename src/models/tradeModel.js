const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

let Trade;

if (sequelize) {
  Trade = sequelize.define('Trade', {
    type: {
      type: DataTypes.ENUM('buy', 'sell'),
      allowNull: false,
    },
    asset: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    entryPrice: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
    },
    exitPrice: {
      type: DataTypes.DECIMAL(10, 4),  // Esto debería estar presente
      allowNull: true,  // Puede estar vacío hasta que se cierre la operación
    },
    status: {
      type: DataTypes.ENUM('open', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
}

module.exports = Trade || {};
