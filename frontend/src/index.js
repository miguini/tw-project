import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Configuración global de Axios para añadir el token automáticamente a todas las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Obtener el token de localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Añadir el token a los headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
