import React from 'react';
import TradingViewWidget from './trading/TradingViewWidget';

const TraderRoom = () => {
  return (
    <div className="trader-room">
      <h2>Trader Room</h2>

      <div className="widget-section">
        <TradingViewWidget />
      </div>
    </div>
  );
};

export default TraderRoom;
