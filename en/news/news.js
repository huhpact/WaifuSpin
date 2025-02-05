const newsData = [
	{
			id: 1,
			title: "WaifuSpin launches a new slot machine",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "Discover the excitement of our latest anime-themed slot machine game, featuring your favorite waifus!",
			more: "Join us now and get 1 free spin on our new game! Our latest slot machine game combines stunning anime artwork with exciting gameplay mechanics. Features include:\n- Multiple bonus rounds\n- Progressive jackpots\n- Free spin multipliers\n- A unique waifu collection system\nDon't miss this incredible gaming experience!"
	},
	{
			id: 2,
			title: "Special weekend bonus",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "Double your deposits this weekend with our special bonus event!",
			more: "Get ready for a weekend of extraordinary bonuses:\n- 100% deposit bonus up to $1000\n- 50 free spins on a selection of games\n- Special tournament with a $10,000 prize pool\n- Exclusive VIP rewards\n- The promotion runs from Friday 00:00 to Sunday 23:59. Terms and conditions apply."
	},
	{
			id: 3,
			title: "New payment methods",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "We have added new convenient payment methods for our players.",
			more: "We are excited to announce new payment options:\n- Major cryptocurrencies (BTC, ETH, XRP, SOL)\n- Popular e-wallets\n- Instant bank transfers\n- Mobile payment solutions\n- All new payment methods offer instant processing and low fees!"
	}
];

function formatDate(dateString) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString('en-US', options);
}

function createNewsHTML(newsItem) {
	return `
			<article class="news-item">
					<h2 class="news-title">${newsItem.title}</h2>
					<div class="news-meta">
							<span class="news-user">By ${newsItem.user}</span>
							<span class="news-date">${formatDate(newsItem.date)}</span>
					</div>
					<p class="news-description">${newsItem.description}</p>
					<button class="news-more" onclick="openModal(${newsItem.id})">Read More</button>
			</article>
	`;
}

function renderNews(newsItems) {
	const newsContainer = document.getElementById('newsContainer');
	const noResults = document.getElementById('noResults');
	
	if (newsItems.length === 0) {
			newsContainer.innerHTML = '';
			noResults.classList.remove('hidden');
	} else {
			noResults.classList.add('hidden');
			newsContainer.innerHTML = newsItems.map(createNewsHTML).join('');
	}
}

function filterNews(searchTerm) {
	const filteredNews = newsData.filter(news => 
			news.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
	renderNews(filteredNews);
}

const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close-button')[0];

function openModal(newsId) {
	const newsItem = newsData.find(item => item.id === newsId);
	if (newsItem) {
			document.getElementById('modalTitle').textContent = newsItem.title;
			document.getElementById('modalUser').textContent = `By ${newsItem.user}`;
			document.getElementById('modalDate').textContent = formatDate(newsItem.date);
			document.getElementById('modalDescription').textContent = newsItem.description;
			document.getElementById('modalMore').innerHTML = newsItem.more.replace(/\n/g, '<br>');
			modal.style.display = 'block';
			document.body.style.overflow = 'hidden';
	}
}

function closeModal() {
	modal.style.display = 'none';
	document.body.style.overflow = 'auto'; 
}

closeButton.onclick = closeModal;
window.onclick = (event) => {
	if (event.target === modal) {
			closeModal();
	}
}

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
			closeModal();
	}
});

document.addEventListener('DOMContentLoaded', () => {
	renderNews(newsData);

	const searchInput = document.getElementById('searchInput');
	searchInput.addEventListener('input', (e) => {
			filterNews(e.target.value);
	});
});