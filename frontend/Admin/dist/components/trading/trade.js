let lastPrice = null;

const buyButton = document.getElementById('buy-button');
const sellButton = document.getElementById('sell-button');
const chartContainer = document.getElementById('chart-container');
const lotSizeInput = document.getElementById('lot-size');
const timeframeSelector = document.getElementById('timeframe-selector');
let currentInterval = '1m'; // Intervalo inicial

// Inicializa el gráfico
const chart = LightweightCharts.createChart(chartContainer, {
    width: chartContainer.offsetWidth,
    height: 500,
    layout: {
        margin: {
            top: 20,
            left: 20,
        }
    },
    leftPriceScale: {
        borderVisible: false,
    },
    timeScale: {
        timeVisible: true, // Aseguramos que se vea la hora
        secondsVisible: true, // Se pueden ver los segundos si es necesario
    }
});

const candleSeries = chart.addCandlestickSeries();

// Función para cargar datos históricos según la temporalidad seleccionada
const loadHistoricalData = (interval) => {
    const apiUrl = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=1000`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const chartData = data.map(d => ({
                time: Math.floor(d[0] / 1000),  // Convierte el tiempo a formato UNIX en segundos
                open: parseFloat(d[1]),
                high: parseFloat(d[2]),
                low: parseFloat(d[3]),
                close: parseFloat(d[4]),
            }));
            candleSeries.setData(chartData); // Cargar los datos históricos en el gráfico

            const latestPrice = parseFloat(data[data.length - 1][4]);
            document.getElementById('buy-price').textContent = latestPrice.toFixed(2);
            document.getElementById('sell-price').textContent = latestPrice.toFixed(2);
            lastPrice = latestPrice;
        })
        .catch(error => console.error('Error al obtener los datos históricos:', error));
};

// Cargar datos iniciales
loadHistoricalData(currentInterval);

// Función para actualizar el gráfico cuando el usuario selecciona un intervalo diferente
const handleTimeframeChange = (event) => {
    const newInterval = event.target.getAttribute('data-timeframe');
    currentInterval = newInterval;  // Actualiza el intervalo actual
    loadHistoricalData(newInterval); // Cargar los datos con el nuevo intervalo

    // Remover la clase 'active' de todos los botones y añadirla solo al seleccionado
    timeframeSelector.querySelectorAll('button').forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
};

// Asignar evento de cambio de temporalidad a cada botón
document.querySelectorAll('.btn-timeframe').forEach(button => {
    button.addEventListener('click', handleTimeframeChange);
});

// Conectar al WebSocket de Binance para actualizaciones en tiempo real de BTC/USDT
const binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

binanceSocket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    const newCandle = message.k;
    const newTick = {
        time: Math.floor(newCandle.t / 1000),  // Convierte el tiempo a formato UNIX en segundos
        open: parseFloat(newCandle.o),
        high: parseFloat(newCandle.h),
        low: parseFloat(newCandle.l),
        close: parseFloat(newCandle.c),
    };
    candleSeries.update(newTick);

    const currentPrice = parseFloat(newCandle.c);
    document.getElementById('buy-price').textContent = currentPrice.toFixed(2);
    document.getElementById('sell-price').textContent = currentPrice.toFixed(2);

    if (lastPrice) {
        if (currentPrice > lastPrice) {
            buyButton.style.backgroundColor = '#26A69A'; // Verde
            buyButton.style.color = 'white'; // Texto blanco
            sellButton.style.backgroundColor = 'white'; // Fondo blanco
            sellButton.style.color = '#EF5350'; // Texto rojo
        } else if (currentPrice < lastPrice) {
            buyButton.style.backgroundColor = 'white'; // Fondo blanco
            buyButton.style.color = '#26A69A'; // Texto verde
            sellButton.style.backgroundColor = '#EF5350'; // Rojo
            sellButton.style.color = 'white'; // Texto blanco
        } else {
            buyButton.style.backgroundColor = 'white'; // Fondo blanco
            buyButton.style.color = '#26A69A'; // Texto verde
            sellButton.style.backgroundColor = 'white'; // Fondo blanco
            sellButton.style.color = '#EF5350'; // Texto rojo
        }
    }

    lastPrice = currentPrice;
};

window.addEventListener('resize', () => {
    chart.applyOptions({ width: chartContainer.offsetWidth });
});

// Descolapsar el sidebar cuando se hace clic en el botón de toggle del menú
document.querySelector('.button-menu-mobile').addEventListener('click', () => {
    document.getElementById('layout-wrapper').classList.toggle('vertical-collpsed');
});
