let userBalances = {
    BTC: 0,
    ETH: 0,
    SOL: 0,
    XRP: 0
};

let selectedCrypto = 'BTC';
let cryptoPrices = {};

const balanceDisplay = document.querySelector('.balance-display');
const balanceAmount = document.getElementById('balanceAmount');
const balanceCryptoIcon = document.getElementById('balanceCryptoIcon');
const withdrawalForm = document.getElementById('withdrawalForm');
const exchangeAmount = document.getElementById('exchangeAmount');

document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 60000); 
    initializeEventListeners();
    updateBalanceDisplay();
});

function initializeEventListeners() {
    document.querySelectorAll('.deposit-section .crypto-option').forEach(option => {
        option.addEventListener('click', (e) => {
            document.querySelectorAll('.deposit-section .crypto-option').forEach(opt => 
                opt.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedCrypto = e.currentTarget.dataset.crypto;
            updateExchangeAmount();
        });
    });

    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const amount = parseFloat(e.target.dataset.amount);
            handleDeposit(amount);
        });
    });

    document.querySelectorAll('.withdraw-options .crypto-option').forEach(option => {
        option.addEventListener('click', (e) => {
            document.querySelectorAll('.withdraw-options .crypto-option').forEach(opt => 
                opt.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedCrypto = e.currentTarget.dataset.crypto;
            updateAvailableBalance();
        });
    });

    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', (e) => {
            selectedCrypto = e.currentTarget.dataset.crypto;
            updateBalanceDisplay();
        });
    });

    withdrawalForm.addEventListener('submit', handleWithdrawal);
}

async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd');
        const data = await response.json();
        
        cryptoPrices = {
            BTC: data.bitcoin?.usd || 100000,
            ETH: data.ethereum?.usd || 2500,
            SOL: data.solana?.usd || 220,
            XRP: data.ripple?.usd || 3
        };

        updatePriceDisplay();
        updateExchangeAmount();
    } catch (error) {
        console.warn('Error fetching prices:', error);
    }
}

function updateBalanceDisplay() {
    balanceAmount.textContent = userBalances[selectedCrypto].toFixed(8);
    balanceCryptoIcon.src = `https://cryptologos.cc/logos/${selectedCrypto.toLowerCase()}-${selectedCrypto.toLowerCase()}-logo.svg`;

    document.querySelectorAll('.dropdown-option').forEach(option => {
        const crypto = option.dataset.crypto;
        option.querySelector('.balance-amount').textContent = userBalances[crypto].toFixed(8);
    });
}

function updatePriceDisplay() {
    Object.entries(cryptoPrices).forEach(([crypto, price]) => {
        const element = document.getElementById(`price-${crypto}`);
        if (element) {
            element.textContent = `$${price.toLocaleString()}`;
        }
    });
}

function updateExchangeAmount() {
    const activeBtn = document.querySelector('.amount-btn:hover');
    if (activeBtn) {
        const amount = parseFloat(activeBtn.dataset.amount);
        const cryptoAmount = amount / cryptoPrices[selectedCrypto];
        exchangeAmount.textContent = `${cryptoAmount.toFixed(8)} ${selectedCrypto}`;
    }
}

function updateAvailableBalance() {
    const availableBalance = document.getElementById('availableBalance');
    availableBalance.textContent = `${userBalances[selectedCrypto].toFixed(8)} ${selectedCrypto}`;
}

function handleDeposit(amount) {
    const cryptoAmount = amount / cryptoPrices[selectedCrypto];
    userBalances[selectedCrypto] += cryptoAmount;
    updateBalanceDisplay();
    showNotification(`Deposited ${cryptoAmount.toFixed(8)} ${selectedCrypto}!`);
}

function handleWithdrawal(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value;

    if (amount > userBalances[selectedCrypto]) {
        showNotification('Bilan insuffisant!', 'error');
        return;
    }

    if (!isValidAddress(address)) {
        showNotification('Adresse invalide du portefeuille!', 'error');
        return;
    }

    userBalances[selectedCrypto] -= amount;
    updateBalanceDisplay();
    updateAvailableBalance();
    showNotification(`Retiré ${amount.toFixed(8)} ${selectedCrypto}!`);
    e.target.reset();
}

function showNotification(message, type = 'succès') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function isValidAddress(address) {
    return address.length >= 26 && address.length <= 35;
}

async function fetchBitcoinRate() {
	try {
			const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
			const data = await response.json();
			const rate = parseFloat(data.bpi.USD.rate.replace(',', ''));
			document.querySelector('.btc-rate').textContent = `1 BTC = $${rate.toFixed(2)}`;
	} catch (error) {
			console.error('Error fetching Bitcoin rate:', error);
	}
}

window.onload = fetchBitcoinRate;