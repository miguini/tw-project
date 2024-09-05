const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');  // Middleware para proteger la ruta
const router = express.Router();

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authenticateToken, getUserProfile);

// Ruta protegida para actualizar el perfil del usuario
router.put('/profile', authenticateToken, updateUserProfile);

module.exports = router;
