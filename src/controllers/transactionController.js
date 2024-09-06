const Transaction = require('../models/transactionModel');

// Obtener historial de transacciones con filtros
const getTransactions = async (req, res) => {
    const { type } = req.query;  // Obtener el filtro de tipo (opcional)

    try {
        const userId = req.user.id;  // ID del usuario autenticado
        let transactions;

        // Si hay un filtro de tipo, aplicarlo; si no, obtener todas las transacciones
        if (type === 'deposit' || type === 'withdraw') {
            transactions = await Transaction.findAll({ where: { userId, type } });
        } else {
            transactions = await Transaction.findAll({ where: { userId } });
        }

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error al obtener las transacciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getTransactions };
