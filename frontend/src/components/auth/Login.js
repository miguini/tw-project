import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // Almacenar el token y la expiración en localStorage
      localStorage.setItem('token', data.token);
      const expirationTime = Date.now() + 3600000; // 1 hora (en milisegundos)
      localStorage.setItem('tokenExpiration', expirationTime);

      // Redirigir al usuario a la página principal o trade
      const isAdmin = data.isAdmin;
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/trade'); // Cambiamos a /trade
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
          placeholder="Password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
