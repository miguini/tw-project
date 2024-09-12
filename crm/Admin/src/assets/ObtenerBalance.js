async function obtenerBalance() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/user/balance', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (response.ok) {
            document.getElementById('balanceCard').textContent = `$${data.balance}`;
        } else {
            console.error('Error al obtener el balance:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
