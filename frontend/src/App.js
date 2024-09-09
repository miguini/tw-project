import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TraderRoom from './components/TraderRoom';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="app-title">MarketSwiss</h1>
        </header>

        <div className="app-content">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas privadas */}
            <Route path="/trader" element={<PrivateRoute><TraderRoom /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />

            {/* Redirigir al login si no está autenticado */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
