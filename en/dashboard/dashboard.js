let userBalances = {
    BTC: 0,
    ETH: 0,
    SOL: 0,
    XRP: 0
};

let selectedCrypto = 'BTC';
const cryptoPrices = {
    BTC: 45000,
    ETH: 2500,
    SOL: 100,
    XRP: 0.5
};

const balanceElement = document.getElementById('balanceAmount');
const balanceCryptoIcon = document.getElementById('balanceCryptoIcon');
const cryptoGrid = document.getElementById('cryptoGrid');
const withdrawalForm = document.getElementById('withdrawalForm');
const learnMoreBtn = document.getElementById('learnMoreBtn');

document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    fetchCryptoPrices();
});

function initializeUI() {
    learnMoreBtn.addEventListener('click', () => {
        document.querySelector('.features').scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', handleDeposit);
    });

    document.querySelectorAll('.crypto-option').forEach(option => {
        option.addEventListener('click', handleCryptoSelection);
    });

    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', handleCryptoSelection);
    });

    withdrawalForm.addEventListener('submit', handleWithdrawal);

    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Game launching... 🎮');
        });
    });

    initializeCryptoGrid();
    updateBalance();
}

function handleDeposit(e) {
    const amount = parseFloat(e.target.dataset.amount);
    const cryptoAmount = amount / cryptoPrices[selectedCrypto];
    userBalances[selectedCrypto] += cryptoAmount;
    updateBalance();
    showNotification(`Deposited ${cryptoAmount.toFixed(8)} ${selectedCrypto}! 🎉`);
}

function handleCryptoSelection(e) {
    const crypto = e.currentTarget.dataset.crypto;
    document.querySelectorAll('.crypto-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.crypto-option[data-crypto="${crypto}"]`).classList.add('active');
    selectedCrypto = crypto;
    updateBalance();
    balanceCryptoIcon.src = `https://cryptologos.cc/logos/${crypto.toLowerCase()}-${crypto.toLowerCase()}-logo.svg`;
}

function handleWithdrawal(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value;

    if (amount > userBalances[selectedCrypto]) {
        showNotification('Insufficient balance! ⚠️', 'error');
        return;
    }

    if (!isValidAddress(address)) {
        showNotification('Invalid wallet address! ⚠️', 'error');
        return;
    }

    userBalances[selectedCrypto] -= amount;
    updateBalance();
    showNotification(`Withdrawn ${amount.toFixed(8)} ${selectedCrypto}! 🎉`);
    e.target.reset();
}

function initializeCryptoGrid() {
    const coins = [
        { symbol: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg' },
        { symbol: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg' },
        { symbol: 'SOL', name: 'Solana', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg' },
        { symbol: 'XRP', name: 'XRP', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg' }
    ];

    cryptoGrid.innerHTML = '';
    coins.forEach(coin => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.innerHTML = `
            <img src="${coin.logo}" alt="${coin.symbol}" class="crypto-icon">
            <div class="crypto-info">
                <h3>${coin.name}</h3>
                <div class="crypto-price" id="price-${coin.symbol}">$${cryptoPrices[coin.symbol].toLocaleString()}</div>
            </div>
        `;
        cryptoGrid.appendChild(card);
    });
}

async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd');
        const data = await response.json();

        if (data.bitcoin) cryptoPrices.BTC = data.bitcoin.usd;
        if (data.ethereum) cryptoPrices.ETH = data.ethereum.usd;
        if (data.solana) cryptoPrices.SOL = data.solana.usd;
        if (data.ripple) cryptoPrices.XRP = data.ripple.usd;

        updatePriceDisplay();
        setInterval(fetchCryptoPrices, 60000);
    } catch (error) {
        console.warn('Using fallback prices due to API error:', error);
        updatePriceDisplay();
    }
}

function updatePriceDisplay() {
    Object.keys(cryptoPrices).forEach(symbol => {
        const priceElement = document.getElementById(`price-${symbol}`);
        if (priceElement) {
            priceElement.textContent = `$${cryptoPrices[symbol].toLocaleString()}`;
        }
    });
}

function updateBalance() {
    balanceElement.textContent = `${userBalances[selectedCrypto].toFixed(8)} ${selectedCrypto}`;
    document.getElementById('availableBalance').textContent = 
        `${userBalances[selectedCrypto].toFixed(8)} ${selectedCrypto}`;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function isValidAddress(address) {
    return address.length >= 26 && address.length <= 35;
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.feature-card, .game-card, .crypto-card').forEach(el => {
    observer.observe(el);
});

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