import React from 'react';
import './App.css';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MarketSwiss</h1>
        <TransactionHistory />
      </header>
    </div>
  );
}

export default App;
