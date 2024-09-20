document.addEventListener('DOMContentLoaded', function () {
    let lastPrice = null;

    const buyButton = document.getElementById('buy-button');
    const sellButton = document.getElementById('sell-button');
    const lotSizeInput = document.getElementById('lot-size');
    const timeframeSelector = document.getElementById('timeframe-selector');

    if (buyButton && sellButton && lotSizeInput && timeframeSelector) {
        // Función para actualizar el tamaño del lotaje
        const updateLotSize = (changeWhole) => {
            let currentLotSize = parseFloat(lotSizeInput.value);
            currentLotSize = Math.max(0.01, currentLotSize + changeWhole);
            lotSizeInput.value = currentLotSize.toFixed(2);
        };

        // Asignar eventos a los botones de lotaje
        document.getElementById('increase-lot').addEventListener('click', () => updateLotSize(1));
        document.getElementById('decrease-lot').addEventListener('click', () => updateLotSize(-1));

        // Permitir el ingreso manual del lotaje
        lotSizeInput.addEventListener('input', (event) => {
            let newValue = parseFloat(event.target.value);
            if (isNaN(newValue) || newValue < 0.01) {
                lotSizeInput.value = '0.01';
            }
        });

        // Controlar los decimales con las flechas en el input de lotaje
        lotSizeInput.addEventListener('wheel', function(event) {
            if (event.deltaY < 0) {
                updateLotSize(0.01); // Rueda hacia arriba, aumenta decimales
            } else {
                updateLotSize(-0.01); // Rueda hacia abajo, disminuye decimales
            }
        });

        // Controlar cambios de temporalidad (solo a nivel de UI, sin afectar el gráfico de React)
        document.querySelectorAll('.btn-timeframe').forEach(button => {
            button.addEventListener('click', (event) => {
                timeframeSelector.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('active');
                });
                event.target.classList.add('active');
            });
        });
    } else {
        console.error("No se encontraron los elementos necesarios en el DOM.");
    }
});
