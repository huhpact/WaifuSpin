// Game data
const games = [
	{ name: 'Slots Paradise', image: 'slots.jpg' },
	{ name: 'Blackjack Pro', image: 'blackjack.jpg' },
	{ name: 'Roulette Royal', image: 'roulette.jpg' },
	{ name: 'Poker Night', image: 'poker.jpg' },
	{ name: 'Lucky Dice', image: 'dice.jpg' },
	{ name: 'Baccarat Elite', image: 'baccarat.jpg' }
];

// Tombola events data
const tombolaEvents = [
	{ name: 'Daily Jackpot', timeLeft: 75, prize: '$10,000' },
	{ name: 'Weekly Raffle', timeLeft: 45, prize: '$50,000' },
	{ name: 'VIP Draw', timeLeft: 90, prize: '$100,000' }
];

// Initialize games section
function initGames() {
	const gamesGrid = document.querySelector('.games-grid');
	games.forEach(game => {
			const gameCard = document.createElement('div');
			gameCard.className = 'game-card';
			gameCard.innerHTML = `
					<img src="${game.image}" alt="${game.name}">
					<div class="game-overlay">
							<h3>${game.name}</h3>
							<button class="play-btn">Play Now</button>
					</div>
			`;
			gamesGrid.appendChild(gameCard);
	});
}

// Initialize tombola section
function initTombola() {
	const tombolaGrid = document.querySelector('.tombola-grid');
	tombolaEvents.forEach(event => {
			const tombolaCard = document.createElement('div');
			tombolaCard.className = 'tombola-card';
			tombolaCard.innerHTML = `
					<h3>${event.name}</h3>
					<p>Prize Pool: ${event.prize}</p>
					<div class="tombola-progress">
							<div class="progress" style="width: ${event.timeLeft}%"></div>
					</div>
					<button class="join-btn">Join Event</button>
			`;
			tombolaGrid.appendChild(tombolaCard);
	});
}

// Handle deposit modal
const modal = document.getElementById('depositModal');
const depositBtn = document.querySelector('.deposit-btn');
const closeBtn = document.querySelector('.close-btn');
const depositCards = document.querySelectorAll('.deposit-card');

depositBtn.addEventListener('click', () => {
	modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
	if (e.target === modal) {
			modal.style.display = 'none';
	}
});

// Handle deposit card clicks
depositCards.forEach(card => {
	card.addEventListener('click', () => {
			const amount = card.dataset.amount;
			// Simulate PayPal redirect
			window.location.href = `https://paypal.com/checkout?amount=${amount}`;
			
			// Store amount in session storage
			sessionStorage.setItem('pendingDeposit', amount);
	});
});

// Handle tombola join buttons
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('join-btn')) {
			const btn = e.target;
			if (btn.textContent === 'Join Event') {
					btn.textContent = 'Joined';
					btn.style.background = 'var(--accent)';
			} else {
					btn.textContent = 'Join Event';
					btn.style.background = '';
			}
	}
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	initGames();
	initTombola();
});

// Check for pending deposits on page load
window.addEventListener('load', () => {
	const pendingDeposit = sessionStorage.getItem('pendingDeposit');
	if (pendingDeposit) {
			const currentBalance = parseFloat(document.querySelector('.balance').textContent.replace('$', ''));
			const newBalance = currentBalance + parseFloat(pendingDeposit);
			document.querySelector('.balance').textContent = `$${newBalance.toFixed(2)}`;
			sessionStorage.removeItem('pendingDeposit');
	}
});

