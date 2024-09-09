import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que la URL del backend sea la correcta (puerto 5000)
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      const isAdmin = data.isAdmin;
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/trader');
      }
    } catch (err) {
      console.error('Error en el login:', err);
    }
  };

  return (
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
  );
};

export default Login;
