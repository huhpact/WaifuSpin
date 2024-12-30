
let btcPrice = 0;

async function updateBTCPrice() {
    try {
        const response = await fetch(CONFIG.API_ENDPOINTS.BITCOIN_PRICE);
        const data = await response.json();
        btcPrice = data.bitcoin.usd;
        updateBalanceDisplay();
    } catch (error) {
        console.error('Error fetching BTC price:', error);
    }
}


updateBTCPrice();
setInterval(updateBTCPrice, CONFIG.API_ENDPOINTS.UPDATE_INTERVAL);


let balance = parseFloat(localStorage.getItem(CONFIG.STORAGE_KEYS.BALANCE)) || 0;

function updateBalanceDisplay() {
    const balanceDisplay = document.getElementById('balanceDisplay');
    const balanceUSD = document.getElementById('balanceUSD');
    
    balanceDisplay.textContent = `${balance.toFixed(8)} BTC`;
    balanceUSD.textContent = `($${(balance * btcPrice).toFixed(2)})`;
}

function updateBalance(amount) {
    balance += amount;
    localStorage.setItem(CONFIG.STORAGE_KEYS.BALANCE, balance);
    updateBalanceDisplay();
}

updateBalanceDisplay();

let btcPriceHistory = [];
const ctx = document.getElementById('priceChart').getContext('2d');
let priceChart;

async function fetchBitcoinData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily');
        const data = await response.json();
        btcPriceHistory = data.prices.map(([timestamp, price]) => ({
            price,
            date: new Date(timestamp).toLocaleDateString()
        }));
        updateDashboard();
    } catch (error) {
        console.error('Error fetching BTC data:', error);
    }
}

function updateDashboard() {
    const currentPrice = btcPriceHistory[btcPriceHistory.length - 1].price;
    const previousPrice = btcPriceHistory[btcPriceHistory.length - 2].price;
    const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
    
    document.getElementById('currentPrice').textContent = `$${currentPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    document.getElementById('priceChange').textContent = `${priceChange.toFixed(2)}%`;
    document.getElementById('priceChange').className = `price-change ${priceChange >= 0 ? 'positive' : 'negative'}`;
    
    updateChart();
    updateBalance();
}

function updateChart() {
    if (priceChart) {
        priceChart.destroy();
    }

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: btcPriceHistory.map(data => data.date),
            datasets: [{
                label: 'Bitcoin Price (USD)',
                data: btcPriceHistory.map(data => data.price),
                borderColor: '#ffd700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}


fetchBitcoinData();
setInterval(fetchBitcoinData, 30000); 


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});


const CONFIG = {
	API_ENDPOINTS: {
			BITCOIN_PRICE: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
			UPDATE_INTERVAL: 30000 
	},
	MINIMUM_WITHDRAWAL: 0.0004, 
	STORAGE_KEYS: {
			BALANCE: 'waifuspin_balance'
	}
};

document.querySelectorAll('.participate-btn').forEach(button => {
	button.addEventListener('click', function() {
			if (!this.classList.contains('participating')) {
					this.textContent = 'Participating';
					this.classList.add('participating');
			} else {
					this.textContent = 'Participate';
					this.classList.remove('participating');
			}
	});
});

document.querySelectorAll('.amount-box').forEach(box => {
	box.addEventListener('click', function(e) {
			e.preventDefault();
			const amount = parseFloat(this.dataset.amount);
			updateBalance(amount);
			
			const message = document.createElement('div');
			message.className = 'success-message';
			message.textContent = `Successfully added ${amount.toFixed(8)} BTC!`;
			document.body.appendChild(message);
			
			setTimeout(() => message.remove(), 3000);
	});
});

document.getElementById('withdrawForm').addEventListener('submit', function(e) {
	e.preventDefault();
	const amount = parseFloat(this.querySelector('input[type="number"]').value);
	
	if (amount > balance) {
			alert('Insufficient funds!');
			return;
	}
	
	if (amount < CONFIG.MINIMUM_WITHDRAWAL) {
			alert(`Minimum withdrawal amount is ${CONFIG.MINIMUM_WITHDRAWAL} BTC`);
			return;
	}
	
	updateBalance(-amount);
	alert('Your withdrawal will be processed within 15 minutes.');
	this.reset();
});