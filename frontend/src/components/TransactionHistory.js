import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0); // Añadir estado para el balance
  const [error, setError] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI1ODQ0NTY5LCJleHAiOjE3MjU4NDgxNjl9.zRiLzfQjwHnD1Xwv_IM9lUHMQBlBJRcTEtQRyVBeNf0'; // Reemplaza con tu token válido

  useEffect(() => {
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
        setBalance(response.data.balance); // Guardar el balance
      } catch (error) {
        setError('Error al obtener el balance');
      }
    };

    fetchTransactions(); // Llamar a la función para obtener transacciones
    fetchBalance(); // Llamar a la función para obtener balance
  }, []);

  return (
    <div>
      <h2>Historial de Transacciones</h2>
      {error && <p>{error}</p>}

      {/* Mostrar el balance */}
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
