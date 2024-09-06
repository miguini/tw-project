const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');
const bcrypt = require('bcryptjs');

// Muestra el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { id, name, email } = user;
        res.status(200).json({ id, name, email });
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Actualiza el perfil del usuario autenticado
const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: 'Perfil actualizado correctamente', user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Obtener el balance del usuario autenticado
const getUserBalance = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ balance: user.balance });
    } catch (error) {
        console.error('Error al obtener el balance del usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Realizar un depósito
const deposit = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.balance = parseFloat(user.balance) + parseFloat(amount);
        await user.save();

        await Transaction.create({
            type: 'deposit',
            amount,
            userId: user.id
        });

        res.status(200).json({ message: 'Depósito realizado correctamente', newBalance: user.balance });
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
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const balance = parseFloat(user.balance);
        const withdrawAmount = parseFloat(amount);

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

        res.status(200).json({ message: 'Retiro realizado correctamente', newBalance: user.balance });
    } catch (error) {
        console.error('Error al realizar el retiro:', error);
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

module.exports = { getUserProfile, updateUserProfile, getUserBalance, deposit, withdraw, getTransactionHistory };
