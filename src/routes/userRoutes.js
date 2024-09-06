const express = require('express');
const { getUserProfile, updateUserProfile, getUserBalance, deposit, withdraw } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');  // Middleware para proteger la ruta
const router = express.Router();

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateToken, getUserProfile);

// Ruta protegida para actualizar el perfil del usuario
router.put('/profile', authenticateToken, updateUserProfile);

// Ruta protegida para obtener el balance del usuario
router.get('/balance', authenticateToken, getUserBalance);

// Ruta para realizar un depósito
router.post('/deposit', authenticateToken, deposit);

// Ruta para realizar un retiro
router.post('/withdraw', authenticateToken, withdraw);

module.exports = router;
