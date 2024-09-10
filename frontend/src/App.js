import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TraderRoom from './components/TraderRoom';
import TransactionHistory from './components/TransactionHistory';
import Deposit from './components/Deposit'; // Importa el nuevo componente
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import './App.css';

// Componente de Inicio
const HomePage = () => (
  <div>
    <h2>Home</h2>
    <p>Bienvenido a MarketSwiss. Selecciona una opción en el menú lateral para continuar.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header solo en rutas privadas */}
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas privadas con el Sidebar fijo */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="dashboard-layout">
                  <Sidebar />
                  <div className="content">
                    <HomePage />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/trade"
            element={
              <PrivateRoute>
                <div className="dashboard-layout">
                  <Sidebar />
                  <div className="content">
                    <TraderRoom />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <div className="dashboard-layout">
                  <Sidebar />
                  <div className="content">
                    <TransactionHistory />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          {/* Nueva ruta para Depositar */}
          <Route
            path="/deposit"
            element={
              <PrivateRoute>
                <div className="dashboard-layout">
                  <Sidebar />
                  <div className="content">
                    <Deposit />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          {/* Redirigir al login si no está autenticado */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
