const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const Trade = require('../models/tradeModel');
const bcrypt = require('bcryptjs');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');

// Muestra el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { id, name, email, alertPercentage } = user;
        res.status(200).json({ id, name, email, alertPercentage });
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualiza el perfil del usuario, permitiendo modificar el alertPercentage
const updateUserProfile = async (req, res) => {
    const { name, email, password, alertPercentage } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (alertPercentage) user.alertPercentage = parseFloat(alertPercentage);

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({
            message: 'Perfil actualizado correctamente',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                alertPercentage: user.alertPercentage,
            }
        });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener el balance detallado del usuario (incluyendo ganancias o pérdidas no realizadas)
const getUserBalanceDetailed = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar que el balance no sea null o undefined
        const userBalance = parseFloat(user.balance) || 0;

        // Obtener las operaciones abiertas para calcular ganancias/pérdidas no realizadas
        const openTrades = await Trade.findAll({ where: { userId: req.user.id, status: 'open' } });

        let unrealizedProfitOrLoss = 0;
        openTrades.forEach(trade => {
            unrealizedProfitOrLoss += calculateProfitOrLoss(trade);
        });

        unrealizedProfitOrLoss = parseFloat(unrealizedProfitOrLoss.toFixed(2)) || 0;
        const totalBalance = userBalance + unrealizedProfitOrLoss;

        // Verificar si el balance cae por debajo del umbral definido
        const alertThresholdValue = (user.alertPercentage / 100) * totalBalance;
        const isBelowThreshold = totalBalance < alertThresholdValue;

        res.status(200).json({
            balance: userBalance.toFixed(2),
            unrealizedProfitOrLoss,
            totalBalance: totalBalance.toFixed(2),
            alertThresholdValue: alertThresholdValue.toFixed(2),
            isBelowThreshold
        });
    } catch (error) {
        console.error('Error al obtener el balance detallado:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Función para calcular la ganancia o pérdida de una operación
const calculateProfitOrLoss = (trade) => {
    const currentPrice = 1.25;  // Precio actual para el cálculo
    const priceDifference = currentPrice - parseFloat(trade.entryPrice);

    if (trade.type === 'buy') {
        return priceDifference * parseFloat(trade.quantity);
    } else if (trade.type === 'sell') {
        return -priceDifference * parseFloat(trade.quantity);
    }
    return 0;
};

// Realizar un depósito
const deposit = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    try {
        // Validar que el monto sea un número positivo
        const depositAmount = parseFloat(amount);
        if (isNaN(depositAmount) || depositAmount <= 0) {
            return res.status(400).json({ message: 'El monto del depósito debe ser un número positivo' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.balance = parseFloat(user.balance) + depositAmount;
        await user.save();

        await Transaction.create({
            type: 'deposit',
            amount: depositAmount,
            userId: user.id
        });

        // Verificar si el balance está por debajo del umbral tras el depósito
        const alertThresholdValue = (user.alertPercentage / 100) * user.balance;
        const isBelowThreshold = user.balance < alertThresholdValue;

        res.status(200).json({
            message: 'Depósito realizado correctamente',
            newBalance: user.balance,
            alert: isBelowThreshold ? 'Alerta: El balance ha caído por debajo del umbral establecido.' : null
        });
    } catch (error) {
        console.error('Error al realizar el depósito:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Realizar un retiro
const withdraw = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    try {
        const withdrawAmount = parseFloat(amount);
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            return res.status(400).json({ message: 'El monto del retiro debe ser un número positivo' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const balance = parseFloat(user.balance);

        if (withdrawAmount > balance) {
            return res.status(400).json({ message: 'Fondos insuficientes' });
        }

        user.balance = balance - withdrawAmount;
        await user.save();

        await Transaction.create({
            type: 'withdraw',
            amount: withdrawAmount,
            userId: user.id
        });

        // Verificar si el balance está por debajo del umbral tras el retiro
        const alertThresholdValue = (user.alertPercentage / 100) * user.balance;
        const isBelowThreshold = user.balance < alertThresholdValue;

        res.status(200).json({
            message: 'Retiro realizado correctamente',
            newBalance: user.balance,
            alert: isBelowThreshold ? 'Alerta: El balance ha caído por debajo del umbral establecido.' : null
        });
    } catch (error) {
        console.error('Error al realizar el retiro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Generar y descargar el reporte de transacciones en formato CSV
const downloadTransactionReport = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { userId: req.user.id } });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No se encontraron transacciones para este usuario.' });
        }

        // Definir la ubicación del archivo CSV (verifica que la carpeta 'reports' exista)
        const csvFilePath = path.join(__dirname, '..', 'reports', `transactions_${req.user.id}.csv`);

        // Configurar el escritor de CSV
        const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: [
                { id: 'id', title: 'ID' },
                { id: 'type', title: 'Tipo' },
                { id: 'amount', title: 'Cantidad' },
                { id: 'createdAt', title: 'Fecha de Creación' }
            ]
        });

        // Escribir los datos al archivo CSV
        await csvWriter.writeRecords(transactions);

        // Enviar el archivo CSV al cliente
        res.download(csvFilePath, `transactions_${req.user.id}.csv`, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err);
                res.status(500).json({ message: 'Error al generar el reporte.' });
            }
        });
    } catch (error) {
        console.error('Error al generar el reporte de transacciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener el historial de transacciones
const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error al obtener el historial de transacciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

//Obtener cantidad de operaciones
const obtenerOperaciones = async (req, res) => {
    try {
        const userId = req.user.id;  // Usuario autenticado
        const operaciones = await Trade.count({ where: { userId } });  // Cuenta las operaciones del usuario
        
        res.status(200).json({ operations: operaciones });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las operaciones' });
    }
};


module.exports = { getUserProfile, updateUserProfile, getUserBalanceDetailed, deposit, withdraw, getTransactionHistory, downloadTransactionReport , obtenerOperaciones };
