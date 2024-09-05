const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,  // Puedes activar el logging si necesitas ver las consultas SQL
    });
} else {
    console.log('No se ha definido DATABASE_URL. Omite la conexión a la base de datos.');
}

const connectDB = async () => {
    if (!sequelize) {
        console.log('No hay conexión a la base de datos.');
        return;
    }
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
};

module.exports = { sequelize, connectDB };
