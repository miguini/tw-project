const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Muestra el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
    try {
        // Obtenemos el usuario por su ID (del token JWT)
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // No enviamos la contraseña en la respuesta
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

        // Actualizar el nombre y el email si se proporcionan
        if (name) user.name = name;
        if (email) user.email = email;

        // Si el usuario quiere cambiar la contraseña, la hasheamos nuevamente
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Guardamos los cambios
        await user.save();

        res.status(200).json({ message: 'Perfil actualizado correctamente', user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { getUserProfile, updateUserProfile };
