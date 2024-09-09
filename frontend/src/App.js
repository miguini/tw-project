import React from 'react';
import './App.css';
import TransactionHistory from './components/TransactionHistory';
import TradingViewWidget from './components/trading/TradingViewWidget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">MarketSwiss</h1>
      </header>

      <div className="app-content">
        <div className="widget-section">
          <TradingViewWidget />
        </div>

        <div className="transaction-history-section">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}

export default App;
