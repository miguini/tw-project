const Trade = require('../models/tradeModel');

// Crear una nueva operación
const createTrade = async (req, res) => {
    const { type, asset, quantity, entryPrice } = req.body;

    try {
        const newTrade = await Trade.create({
            type,
            asset,
            quantity,
            entryPrice,
            userId: req.user.id,
        });

        return res.status(201).json({ message: 'Operación creada', trade: newTrade });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la operación', error });
    }
};

// Obtener todas las operaciones del usuario
const getTrades = async (req, res) => {
    try {
        const trades = await Trade.findAll({ where: { userId: req.user.id } });
        return res.status(200).json(trades);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las operaciones', error });
    }
};

// Actualizar una operación
const updateTrade = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const trade = await Trade.findByPk(id);

        if (!trade) {
            return res.status(404).json({ message: 'Operación no encontrada' });
        }

        if (trade.userId !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para actualizar esta operación' });
        }

        trade.status = status;
        await trade.save();

        return res.status(200).json({ message: 'Operación actualizada', trade });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la operación', error });
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

        if (trade.userId !== req.user.id) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta operación' });
        }

        await trade.destroy();

        return res.status(200).json({ message: 'Operación eliminada' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la operación', error });
    }
};

module.exports = { createTrade, getTrades, updateTrade, deleteTrade };
