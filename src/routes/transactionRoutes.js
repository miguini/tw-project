const express = require('express');
const { getTransactions } = require('../controllers/transactionController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Ruta para obtener el historial de transacciones con filtros
router.get('/transactions', authenticateToken, getTransactions);

module.exports = router;
