const Trade = require('../models/tradeModel');
const User = require('../models/userModel');
const { Op } = require('sequelize');


// Crear una nueva operación
const createTrade = async (req, res) => {
    const { type, asset, quantity, entryPrice } = req.body;
    const userId = req.user.id; // ID del usuario autenticado

    try {
        const newTrade = await Trade.create({
            type,
            asset,
            quantity,
            entryPrice,
            status: 'open',
            userId
        });

        res.status(201).json({ message: 'Operación creada', trade: newTrade });
    } catch (error) {
        console.error('Error al crear la operación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todas las operaciones del usuario
const getTrades = async (req, res) => {
    try {
        const trades = await Trade.findAll({ where: { userId: req.user.id } });
        res.status(200).json(trades);
    } catch (error) {
        console.error('Error al obtener las operaciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualizar una operación (cerrarla y calcular balance)
const updateTrade = async (req, res) => {
    const { exitPrice } = req.body;
    const { id } = req.params;

    try {
        const trade = await Trade.findByPk(id);
        if (!trade) {
            return res.status(404).json({ message: 'Operación no encontrada' });
        }

        if (trade.status === 'closed') {
            return res.status(400).json({ message: 'La operación ya está cerrada' });
        }

        // Actualizar el precio de salida y cerrar la operación
        trade.exitPrice = parseFloat(exitPrice);
        trade.status = 'closed';
        await trade.save(); // Guardar los cambios

        // Calcular la ganancia o pérdida
        const profitOrLoss = calculateProfitOrLoss(trade);

        // Buscar el usuario por ID
        const user = await User.findByPk(trade.userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar el balance del usuario, asegurándonos de que no sea null
        user.balance = (parseFloat(user.balance) || 0) + profitOrLoss;
        await user.save();

        res.status(200).json({ message: 'Operación actualizada', trade, profitOrLoss, newBalance: user.balance });
    } catch (error) {
        console.error('Error al cerrar la operación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Eliminar una operación
const deleteTrade = async (req, res) => {
    const { id } = req.params;

    try {
        const trade = await Trade.findByPk(id);
        if (!trade) {
            return res.status(404).json({ message: 'Operación no encontrada' });
        }

        await trade.destroy();
        res.status(200).json({ message: 'Operación eliminada' });
    } catch (error) {
        console.error('Error al eliminar la operación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Función para calcular la ganancia o pérdida
const calculateProfitOrLoss = (trade) => {
    const priceDifference = parseFloat(trade.exitPrice) - parseFloat(trade.entryPrice);
    let profitOrLoss;

    if (trade.type === 'buy') {
        profitOrLoss = priceDifference * parseFloat(trade.quantity);
    } else if (trade.type === 'sell') {
        profitOrLoss = -priceDifference * parseFloat(trade.quantity);
    }

    return parseFloat(profitOrLoss.toFixed(2));  // Redondeamos a 2 decimales
};

// Obtener todas las operaciones cerradas del usuario
const getClosedTrades = async (req, res) => {
    try {
        const closedTrades = await Trade.findAll({ where: { userId: req.user.id, status: 'closed' } });
        res.status(200).json(closedTrades);
    } catch (error) {
        console.error('Error al obtener las operaciones cerradas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener todas las operaciones abiertas del usuario
const getOpenTrades = async (req, res) => {
    try {
        const openTrades = await Trade.findAll({ where: { userId: req.user.id, status: 'open' } });
        res.status(200).json(openTrades);
    } catch (error) {
        console.error('Error al obtener las operaciones abiertas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
const getAccountPerformance = async (req, res) => {
    try {
        // Obtener todas las operaciones cerradas
        const closedTrades = await Trade.findAll({ where: { userId: req.user.id, status: 'closed' } });

        const rendimientoPorMes = {};

        // Recorrer todas las operaciones cerradas
        closedTrades.forEach(trade => {
            const tradeDate = new Date(trade.updatedAt);
            const month = tradeDate.getMonth() + 1; // obtener el mes (0-indexado)
            const year = tradeDate.getFullYear(); // obtener el año
            const monthYear = `${month}/${year}`; // Mes y año en formato numérico

            const profitOrLoss = calculateProfitOrLoss(trade);

            if (!rendimientoPorMes[monthYear]) {
                rendimientoPorMes[monthYear] = 0;
            }
            rendimientoPorMes[monthYear] += profitOrLoss;
        });

        const performanceData = {
            meses: Object.keys(rendimientoPorMes),
            rendimiento: Object.values(rendimientoPorMes)
        };

        res.status(200).json(performanceData);
    } catch (error) {
        console.error('Error al obtener el rendimiento:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


// Obtener el historial completo de todas las operaciones del usuario
const getTradeHistory = async (req, res) => {
    try {
        // Obtener todas las operaciones del usuario autenticado
        const trades = await Trade.findAll({ where: { userId: req.user.id } });

        // Añadir detalles adicionales a cada operación
        const detailedTrades = trades.map(trade => {
            const tradeDuration = trade.status === 'closed' ? (new Date(trade.updatedAt) - new Date(trade.createdAt)) : null;
            return {
                id: trade.id,
                type: trade.type,
                asset: trade.asset,
                quantity: trade.quantity,
                entryPrice: trade.entryPrice,
                exitPrice: trade.exitPrice,
                status: trade.status,
                createdAt: trade.createdAt,
                updatedAt: trade.updatedAt,
                tradeDuration: tradeDuration ? `${Math.floor(tradeDuration / (1000 * 60 * 60))} hours` : 'Still open',
                userId: trade.userId,
                profitOrLoss: trade.status === 'closed' ? calculateProfitOrLoss(trade) : null
            };
        });

        res.status(200).json(detailedTrades);
    } catch (error) {
        console.error('Error al obtener el historial de operaciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }

    
};

const getTradesByMonth = async (req, res) => {
    const { month, year } = req.query; // Obtener mes y año de la consulta

    try {
        const trades = await Trade.findAll({
            where: {
                userId: req.user.id,
                status: 'closed',
                updatedAt: {
                    [Op.between]: [
                        new Date(year, month - 1, 1),
                        new Date(year, month, 0)
                    ]
                }
            }
        });

        res.status(200).json(trades);
    } catch (error) {
        console.error('Error al obtener las operaciones:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


module.exports = { createTrade, getTrades, updateTrade, deleteTrade, getClosedTrades, getOpenTrades, getTradeHistory, getAccountPerformance,getTradesByMonth };
