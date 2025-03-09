const newsData = [
	{
			id: 1,
			title: "WaifuSpin bringt einen neuen Spielautomaten heraus",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "Erleben Sie die Spannung unseres neuesten Spielautomaten-Spiels mit Cartoon-Thema, in dem Ihre Lieblingswaifus im Mittelpunkt stehen!",
			more: "Melden Sie sich jetzt bei uns an und erhalten Sie 1 Freispiel für unser neues Spiel! Unser neuestes Spielautomaten-Spiel vereint wunderschöne Anime-Zeichnungen mit spannenden Spielmechanismen. Zu den Features gehören:- Mehrere Bonusrunden- Progressive Jackpots- Multiplikatoren für Gratisdrehs- Ein einzigartiges Waifu-Sammelsystem- Verpassen Sie nicht dieses unglaubliche Spielerlebnis!"
	},
	{
			id: 2,
			title: "Spezieller Wochenendbonus",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "Verdoppeln Sie Ihre Einzahlungen an diesem Wochenende mit unserem speziellen Bonus-Event!",
			more: "Bereiten Sie sich auf ein Wochenende voller außergewöhnlicher Boni vor:\n 100% Einzahlungsbonus bis zu $1000\n 50 Freispiele für ausgewählte Spiele\n Spezielles Turnier mit einem Preispool von $10.000\n Exklusive VIP Belohnungen\n Die Aktion läuft von Freitag 00:00 bis Sonntag 23:59. Es gelten die Allgemeinen Geschäftsbedingungen."
	},
	{
			id: 3,
			title: "Neue Zahlungsmethoden",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "Wir haben neue, bequeme Zahlungsmethoden für unsere Spieler hinzugefügt.",
			more: "Wir freuen uns, neue Zahlungsmöglichkeiten bekannt geben zu können: \n Die wichtigsten Kryptowährungen (BTC, ETH, XRP, SOL) \n Beliebte elektronische Geldbörsen \n Sofortige Banküberweisungen \n Mobile Zahlungslösungen \n Alle neuen Zahlungsmethoden bieten eine sofortige Bearbeitung und niedrige Gebühren!"
	}
];

function formatDate(dateString) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString('de-DE', options);
}

function createNewsHTML(newsItem) {
	return `
			<article class="news__item">
					<h2 class="news__title">${newsItem.title}</h2>
					<div class="news__meta">
							<span class="news__user">Von ${newsItem.user}</span>
							<span class="news__date">${formatDate(newsItem.date)}</span>
					</div>
					<p class="news__description">${newsItem.description}</p>
					<button class="news__more" onclick="openModal(${newsItem.id})">Mehr lesen</button>
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
const closeButton = document.getElementsByClassName('close__button')[0];

function openModal(newsId) {
	const newsItem = newsData.find(item => item.id === newsId);
	if (newsItem) {
			document.getElementById('modalTitle').textContent = newsItem.title;
			document.getElementById('modalUser').textContent = `Par ${newsItem.user}`;
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