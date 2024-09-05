const express = require('express');
const { createTrade, getTrades, updateTrade, deleteTrade } = require('../controllers/tradeController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Ruta para crear una nueva operación
router.post('/trades', authenticateToken, createTrade);

// Ruta para obtener todas las operaciones del usuario
router.get('/trades', authenticateToken, getTrades);

// Ruta para actualizar una operación
router.put('/trades/:id', authenticateToken, updateTrade);

// Ruta para eliminar una operación
router.delete('/trades/:id', authenticateToken, deleteTrade);

module.exports = router;
