const express = require('express');
const { getTransactions, getTransactionTotals } = require('../controllers/transactionController'); // Importa ambos métodos
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Ruta para obtener el historial de transacciones con filtros
router.get('/transactions', authenticateToken, getTransactions);

// Ruta para obtener el total de depósitos y retiros
router.get('/transactions-totals', authenticateToken, getTransactionTotals);

module.exports = router;
