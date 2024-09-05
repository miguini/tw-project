// Muestra el perfil de usuario
const getUserProfile = (req, res) => {
    // Aquí obtendrías el perfil desde la base de datos
    res.json({ message: 'Perfil de usuario' });
};

module.exports = { getUserProfile };
