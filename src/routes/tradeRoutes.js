const express = require('express');
const { createTrade, getTrades, updateTrade, deleteTrade, getClosedTrades, getOpenTrades } = require('../controllers/tradeController');
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

// Ruta para obtener solo las operaciones cerradas
router.get('/trades/closed', authenticateToken, getClosedTrades);

// Ruta para obtener solo las operaciones abiertas
router.get('/trades/open', authenticateToken, getOpenTrades);

module.exports = router;
