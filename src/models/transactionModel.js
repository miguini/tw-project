const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.ENUM('deposit', 'withdraw'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Transaction;
