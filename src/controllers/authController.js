// authController.js
const User = require('../models/userModel');  // Asegúrate de que el archivo userModel.js esté en src/models
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    console.log('Recibí una solicitud de registro');
    const { name, email, password } = req.body;
    console.log('Datos recibidos:', { name, email, password });

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('El usuario ya existe');
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Contraseña hasheada:', hashedPassword);

        // Crear el nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        console.log('Nuevo usuario creado:', newUser);

        // Generar el token JWT
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generado:', token);

        return res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Autenticar un usuario (login)
const loginUser = async (req, res) => {
    console.log('Recibí una solicitud de login');
    const { email, password } = req.body;
    console.log('Datos de login recibidos:', { email, password });

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Contraseña incorrecta');
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token de login generado:', token);

        return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { registerUser, loginUser };
