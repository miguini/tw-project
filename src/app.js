const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);  // <-- Verifica si DATABASE_URL está cargado
console.log('JWT_SECRET:', process.env.JWT_SECRET);  // <-- Verifica si JWT_SECRET está cargado

const { connectDB, sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');  // <-- Ruta para el perfil del usuario y transacciones
const tradeRoutes = require('./routes/tradeRoutes');  // <-- Ruta para las operaciones
const authenticateToken = require('./middlewares/auth');

const app = express();
app.use(express.json());
app.use(cors());

// Configura el servidor para servir archivos estáticos con el tipo MIME adecuado
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

if (process.env.DATABASE_URL) {
    connectDB().then(() => {
        sequelize.sync({ alter: true }).then(() => {
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

// Conectar las rutas del perfil de usuario y transacciones
app.use('/api/user', userRoutes);

// Conectar las rutas de operaciones de trading
app.use('/api', tradeRoutes);

// Rutas protegidas
app.get('/api/private', authenticateToken, (req, res) => {
    res.send(`Accediste a una ruta privada, bienvenido usuario ${req.user.id}`);
});

// Ruta para obtener el rendimiento de la cuenta del usuario
app.get('/api/performance', authenticateToken, (req, res) => {
    const performanceData = {
        meses: ['Enero', 'Febrero', 'Marzo'],  // Asegúrate de modificar esta parte según tu lógica de negocio
        rendimiento: [1000, -500, 1500]  // Datos de ejemplo de ganancias/pérdidas
    };
    res.status(200).json(performanceData);
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
