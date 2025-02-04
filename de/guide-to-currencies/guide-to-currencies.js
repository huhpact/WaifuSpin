const currencies = [
  { 
    code: 'USD', 
    name: 'US Dollar', 
    symbol: '$', 
    icon: 'dollar-sign',
    image: '/images/usd.webp'
  },
  { 
    code: 'EUR', 
    name: 'Euro', 
    symbol: '€', 
    icon: 'euro-sign',
    image: '/images/eur.jpg'
  },
  { 
    code: 'GBP', 
    name: 'British Pound', 
    symbol: '£', 
    icon: 'pound-sign',
    image: '/images/uk.webp'
  },
  { 
    code: 'JPY', 
    name: 'Japanese Yen', 
    symbol: '¥', 
    icon: 'yen-sign',
    image: '/images/jpn.png'
  },
  { 
    code: 'BTC', 
    name: 'Bitcoin', 
    symbol: '₿', 
    icon: 'bitcoin',
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  { 
    code: 'ETH', 
    name: 'Ethereum', 
    symbol: 'Ξ', 
    icon: 'ethereum',
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  },
  { 
    code: 'USDT', 
    name: 'Tether', 
    symbol: '₮', 
    icon: 'dollar-sign',
    image: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
  }
];

function createCurrencyItems() {
  const scrollContainer = document.getElementById('currencyScroll');

  const items = [...currencies, ...currencies, ...currencies].map(currency => {
    const item = document.createElement('div');
    item.className = 'currency-item';
    item.innerHTML = `
      <img src="${currency.image}" alt="${currency.name}" />
      <span>${currency.symbol}</span>
      <span>${currency.code}</span>
    `;
    return item;
  });
  
  scrollContainer.append(...items);
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  createCurrencyItems();
  
  document.querySelectorAll('.info-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    observer.observe(card);
  });

  document.querySelectorAll('.stat-number').forEach(stat => {
    const finalValue = parseInt(stat.textContent);
    let currentValue = 0;
    const duration = 2000; 
    const increment = finalValue / (duration / 16); 

    const counter = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        clearInterval(counter);
        currentValue = finalValue;
      }
      stat.textContent = Math.round(currentValue) + (stat.textContent.includes('%') ? '%' : '');
    }, 16);
  });
});