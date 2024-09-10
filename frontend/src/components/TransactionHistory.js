import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // Función para obtener las transacciones
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/transactions');
        setTransactions(response.data);
      } catch (error) {
        setError('Error al obtener las transacciones');
      }
    };

    // Función para obtener el balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/balance-detailed');
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
