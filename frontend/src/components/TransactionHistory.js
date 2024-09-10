import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para verificar si el token ha expirado
  const checkTokenExpiration = useCallback(() => {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (Date.now() > expirationTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkTokenExpiration(); // Verificar la expiración del token antes de realizar la solicitud

    const token = localStorage.getItem('token'); // Obtener el token almacenado

    if (!token) {
      navigate('/login'); // Si no hay token, redirigir al login
    }

    // Función para obtener las transacciones
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        setError('Error al obtener las transacciones');
      }
    };

    // Función para obtener el balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/balance-detailed', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (error) {
        setError('Error al obtener el balance');
      }
    };

    fetchTransactions();
    fetchBalance();
  }, [checkTokenExpiration, navigate]);

  return (
    <div>
      <h2>Historial de Transacciones</h2>
      {error && <p>{error}</p>}
      <h3>Balance Actual: {balance}</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} - {transaction.amount} -{' '}
            {new Date(transaction.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
