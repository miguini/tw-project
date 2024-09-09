import React, { useEffect, useRef, useState, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false); // Para evitar duplicación

  useEffect(() => {
    // Solo cargamos el widget si no ha sido cargado previamente
    if (!isWidgetLoaded && container.current && !container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "hide_side_toolbar": false,
          "allow_symbol_change": false,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
      setIsWidgetLoaded(true); // Marcamos como cargado para evitar duplicación
    }

    const handleFullscreenChange = () => {
      if (
        document.fullscreenElement === container.current ||
        document.webkitFullscreenElement === container.current ||
        document.mozFullScreenElement === container.current ||
        document.msFullscreenElement === container.current
      ) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isWidgetLoaded]); // Solo se ejecuta una vez al montar el componente

  const toggleFullscreen = () => {
    const element = container.current;
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Botón para alternar pantalla completa */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <button
          onClick={toggleFullscreen}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: '#282c34',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        </button>
      </div>

      {/* Contenedor del widget */}
      <div className="tradingview-widget-container" ref={container} style={{ height: '500px', width: '100%' }}>
        <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
