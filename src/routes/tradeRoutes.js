const express = require('express');
const {
    createTrade,
    getTrades,
    updateTrade,
    deleteTrade,
    getClosedTrades,
    getOpenTrades,
    getTradeHistory,
    getAccountPerformance,
    getTradesByMonth
} = require('../controllers/tradeController');

const { obtenerOperaciones } = require('../controllers/userController');  // Importar desde userController
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

// Ruta para obtener el historial completo de operaciones del usuario
router.get('/trades/history', authenticateToken, getTradeHistory);

// Ruta para obtener rendimiento de usuario
router.get('/performance', authenticateToken, getAccountPerformance);

// Filtrar las operaciones según su fecha de creación o actualización
router.get('/trades/month', authenticateToken, getTradesByMonth);

// Ruta para obtener el número de operaciones
router.get('/operations', authenticateToken, obtenerOperaciones);  // Utiliza la función de userController

module.exports = router;
