const express = require('express');
const { getUserProfile, updateUserProfile, getUserBalance, deposit, withdraw, getTransactionHistory, getUserBalanceDetailed, downloadTransactionReport } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateToken, getUserProfile);

// Ruta protegida para actualizar el perfil del usuario
router.put('/profile', authenticateToken, updateUserProfile);

// Ruta protegida para obtener el balance del usuario
router.get('/balance', authenticateToken, getUserBalance);

// Nueva ruta protegida para obtener el balance detallado del usuario
router.get('/balance-detailed', authenticateToken, getUserBalanceDetailed);

// Rutas para depósito y retiro
router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);

// Ruta protegida para obtener el historial de transacciones
router.get('/transactions', authenticateToken, getTransactionHistory);

// Ruta para descargar el historial de transacciones en formato CSV
router.get('/transactions/report', authenticateToken, (req, res, next) => {
    console.log('Ruta alcanzada: /transactions/report');  // Añadimos este log
    next();
}, downloadTransactionReport);

module.exports = router;
