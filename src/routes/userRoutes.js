const express = require('express');
const { getUserProfile, updateUserProfile, getUserBalance, deposit, withdraw, getTransactionHistory } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateToken, getUserProfile);

// Ruta protegida para actualizar el perfil del usuario
router.put('/profile', authenticateToken, updateUserProfile);

// Ruta protegida para obtener el balance del usuario
router.get('/balance', authenticateToken, getUserBalance);

// Rutas para depósito y retiro
router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);

// Ruta protegida para obtener el historial de transacciones
router.get('/transactions', authenticateToken, getTransactionHistory);

module.exports = router;
