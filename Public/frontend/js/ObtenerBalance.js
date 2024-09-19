async function obtenerBalance() {
    try {
        const token = localStorage.getItem('token');

        // Obtener el balance
        const balanceResponse = await fetch('http://localhost:5000/api/user/balance', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        const balanceData = await balanceResponse.json();
        if (balanceResponse.ok) {
            document.getElementById('balanceCard').textContent = `$${balanceData.balance}`;
        } else {
            console.error('Error al obtener el balance:', balanceData.message);
        }

        // Obtener los totales de depósitos y retiros
        const totalsResponse = await fetch('http://localhost:5000/api/user/transactions-totals', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        const totalsData = await totalsResponse.json();
        if (totalsResponse.ok) {
            document.getElementById('totalDeposits').textContent = `$${totalsData.totalDeposits}`;
            document.getElementById('totalWithdrawals').textContent = `$${totalsData.totalWithdrawals}`;
        } else {
            console.error('Error al obtener los totales de transacciones:', totalsData.message);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
