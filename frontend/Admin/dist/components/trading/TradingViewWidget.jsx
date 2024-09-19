import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const TradingViewWidget = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const lineSeries = chart.addLineSeries();

    // Obtener datos históricos sin necesidad de un token
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.prices.map((d) => ({
          time: Math.floor(d[0] / 1000), // Convertir a timestamp UNIX
          value: d[1],
        }));
        lineSeries.setData(formattedData);
      });

    // Conectar a una API de datos en tiempo real
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin');
    socket.onmessage = function (event) {
      const newData = JSON.parse(event.data);
      lineSeries.update({
        time: Math.floor(Date.now() / 1000), // Tiempo actual
        value: parseFloat(newData.bitcoin),
      });
    };

    return () => {
      chart.remove();
      socket.close();
    };
  }, []);

  return <div ref={chartContainerRef} />;
};

export default TradingViewWidget;
