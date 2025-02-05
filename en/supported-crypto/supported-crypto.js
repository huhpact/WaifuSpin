const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
			}
	});
}, observerOptions);

document.querySelectorAll('.crypto-card, .step, .feature-card').forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(30px)';
	el.style.transition = 'all 0.6s ease';
	observer.observe(el);
});

function createParticles() {
	const particlesContainer = document.createElement('div');
	particlesContainer.className = 'particles';
	particlesContainer.style.position = 'absolute';
	particlesContainer.style.top = '0';
	particlesContainer.style.left = '0';
	particlesContainer.style.width = '100%';
	particlesContainer.style.height = '100%';
	particlesContainer.style.overflow = 'hidden';
	particlesContainer.style.zIndex = '-1';
	
	document.querySelector('.hero').appendChild(particlesContainer);

	for (let i = 0; i < 50; i++) {
			const particle = document.createElement('div');
			particle.className = 'particle';
			particle.style.position = 'absolute';
			particle.style.width = '2px';
			particle.style.height = '2px';
			particle.style.background = 'rgba(255, 255, 255, 0.1)';
			particle.style.borderRadius = '50%';
			
			particle.style.left = Math.random() * 100 + '%';
			particle.style.top = Math.random() * 100 + '%';
			
			particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
			particlesContainer.appendChild(particle);
	}
}

function createTransactionFeed() {
	const feed = document.querySelector('.transaction-feed');
	const currencies = ['BTC', 'ETH', 'SOL', 'XRP'];
	const types = ['Deposit', 'Withdrawal', 'Conversion'];

	function createTransaction() {
			const transaction = document.createElement('div');
			transaction.className = 'transaction-item';
			transaction.style.padding = '1rem';
			transaction.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
			transaction.style.transform = 'translateX(-100%)';
			transaction.style.opacity = '0';
			transaction.style.transition = 'all 0.3s ease';

			const type = types[Math.floor(Math.random() * types.length)];
			const currency = currencies[Math.floor(Math.random() * currencies.length)];
			const amount = (Math.random() * 10).toFixed(4);
			
			transaction.innerHTML = `
					<div style="display: flex; justify-content: space-between; align-items: center">
							<span style="color: white">${type}</span>
							<span style="color: ${type === 'Deposit' ? '#00ff9d' : '#ff4b4b'}">
									${type === 'Deposit' ? '+' : '-'}${amount} ${currency}
							</span>
					</div>
			`;

			feed.insertBefore(transaction, feed.firstChild);
			
			setTimeout(() => {
					transaction.style.transform = 'translateX(0)';
					transaction.style.opacity = '1';
			}, 100);

			const items = feed.getElementsByClassName('transaction-item');
			if (items.length > 8) {
					items[items.length - 1].remove();
			}
	}

	setInterval(createTransaction, 3000);
	createTransaction();
}

function initializeCharts() {
	const volumeChart = document.querySelector('.volume-chart');
	const usersChart = document.querySelector('.users-chart');

	function createChartBars(container, count) {
			for (let i = 0; i < count; i++) {
					const bar = document.createElement('div');
					bar.style.position = 'absolute';
					bar.style.bottom = '0';
					bar.style.width = `${100/count}%`;
					bar.style.left = `${(i * 100)/count}%`;
					bar.style.background = 'var(--gradient)';
					bar.style.transition = 'height 0.5s ease';
					container.appendChild(bar);
					
					function updateHeight() {
							const height = 20 + Math.random() * 80;
							bar.style.height = `${height}%`;
					}
					
					updateHeight();
					setInterval(updateHeight, 2000 + i * 100);
			}
	}

	createChartBars(volumeChart, 12);
	createChartBars(usersChart, 8);
}

function initializeConversionAnimation() {
	const conversions = document.querySelectorAll('.conversion-animation');
	const currencies = ['USD', 'EUR', 'YEN', 'CAD'];
	const cryptos = ['BTC', 'ETH', 'SOL', 'XRP'];

	conversions.forEach(conversion => {
			const from = conversion.querySelector('.from');
			const to = conversion.querySelector('.to');
			
			let currentFromIndex = 0;
			let currentToIndex = 0;

			setInterval(() => {
					currentFromIndex = (currentFromIndex + 1) % currencies.length;
					from.textContent = currencies[currentFromIndex];
			}, 2000);

			setInterval(() => {
					currentToIndex = (currentToIndex + 1) % cryptos.length;
					to.textContent = cryptos[currentToIndex];
			}, 2000);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	createParticles();
	createTransactionFeed();
	initializeCharts();
	initializeConversionAnimation();

	const style = document.createElement('style');
	style.textContent = `
			@keyframes float {
					0% {
							transform: translateY(0) translateX(0);
							opacity: 0;
					}
					50% {
							opacity: 1;
					}
					100% {
							transform: translateY(-100vh) translateX(100px);
							opacity: 0;
					}
			}
	`;
	document.head.appendChild(style);
});