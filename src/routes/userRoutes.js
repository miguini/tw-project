const express = require('express');
const { 
    getUserProfile, 
    updateUserProfile, 
    deposit, 
    withdraw, 
    getTransactionHistory, 
    getUserBalanceDetailed, 
    downloadTransactionReport 
} = require('../controllers/userController');
const { getAccountPerformance } = require('../controllers/tradeController');  // Importación de la función
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateToken, getUserProfile);

// Ruta protegida para actualizar el perfil del usuario
router.put('/profile', authenticateToken, updateUserProfile);

// Rutas para depósito y retiro
router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);

// Ruta protegida para obtener el historial de transacciones
router.get('/transactions', authenticateToken, getTransactionHistory);

// Ruta para descargar el historial de transacciones en formato CSV
router.get('/transactions/report', authenticateToken, downloadTransactionReport);

// Ruta para obtener el balance del usuario
router.get('/balance', authenticateToken, getUserBalanceDetailed);

// Ruta para obtener el rendimiento de la cuenta
router.get('/performance', authenticateToken, getAccountPerformance);  // Nueva ruta

module.exports = router;
