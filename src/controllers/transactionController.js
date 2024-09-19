const Transaction = require('../models/transactionModel');

// Obtener historial de transacciones con filtros
const getTransactions = async (req, res) => {
    const { type } = req.query;

    try {
        const userId = req.user.id;
        let transactions;

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

// Obtener el total de depósitos y retiros
const getTransactionTotals = async (req, res) => {
    try {
        const userId = req.user.id;

        // Sumar el total de depósitos
        const totalDeposits = await Transaction.sum('amount', {
            where: { userId, type: 'deposit' }
        });

        // Sumar el total de retiros
        const totalWithdrawals = await Transaction.sum('amount', {
            where: { userId, type: 'withdraw' }
        });

        res.status(200).json({
            totalDeposits: totalDeposits || 0,
            totalWithdrawals: totalWithdrawals || 0
        });
    } catch (error) {
        console.error('Error al obtener los totales de transacciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getTransactions, getTransactionTotals };
