const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

let User;

// Solo definimos el modelo si la conexión a la base de datos está disponible
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
        }
    });
} else {
    console.log('Sequelize no está definido. El modelo de usuario no se creó.');
}

// Exportamos el modelo solo si está definido
module.exports = User || {};
