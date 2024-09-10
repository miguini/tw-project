import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Agregamos campo de nombre si es necesario
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Petición al backend para registrar al usuario
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });

      // Guardar el token en localStorage
      localStorage.setItem('token', data.token);

      // Redirigir al usuario al dashboard correspondiente
      const isAdmin = data.isAdmin;
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/trader');
      }
    } catch (err) {
      console.error(err);
      setError('Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
