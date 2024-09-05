const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./userModel');

const Trade = sequelize.define('Trade', {
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('open', 'closed'),
        defaultValue: 'open',
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    }
});

User.hasMany(Trade, { foreignKey: 'userId' });
Trade.belongsTo(User, { foreignKey: 'userId' });

module.exports = Trade;
