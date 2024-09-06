const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);  // <-- Verifica si DATABASE_URL está cargado
console.log('JWT_SECRET:', process.env.JWT_SECRET);  // <-- Verifica si JWT_SECRET está cargado

const { connectDB, sequelize } = require('./models');  // Importar la función de conexión y sequelize
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');  // <-- Nueva ruta para el perfil del usuario
const tradeRoutes = require('./routes/tradeRoutes');  // <-- Nueva ruta para las operaciones
const authenticateToken = require('./middlewares/auth');  // <-- Middleware de autenticación

const app = express();
app.use(express.json());
app.use(cors());

// Conectar la base de datos y sincronizar los modelos solo si DATABASE_URL está definido
if (process.env.DATABASE_URL) {
    connectDB().then(() => {
        // Eliminar el force: true para evitar la eliminación de datos
        sequelize.sync().then(() => {
            console.log('Modelos sincronizados con la base de datos.');
        }).catch((err) => {
            console.error('Error sincronizando los modelos con la base de datos:', err);
        });
    }).catch((err) => {
        console.error('Error conectando a la base de datos:', err);
    });
} else {
    console.log('No se ha definido DATABASE_URL. Omite la conexión a la base de datos.');
}

// Conectar las rutas de autenticación
app.use('/api/auth', authRoutes);

// Conectar las rutas del perfil de usuario
app.use('/api/user', userRoutes);

// Conectar las rutas de operaciones de trading
app.use('/api', tradeRoutes);

// Rutas protegidas
app.get('/api/private', authenticateToken, (req, res) => {
    res.send(`Accediste a una ruta privada, bienvenido usuario ${req.user.id}`);
});

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('Bienvenido a MarketSwiss');
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
