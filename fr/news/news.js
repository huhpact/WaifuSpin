
const newsData = [
  {
      id: 1,
      title: "WaifuSpin lance une nouvelle machine à sous",
      user: "huh(pact)",
      date: "2025-01-30",
      description: "Découvrez l'excitation de notre dernier jeu de machines à sous sur le thème des dessins animés, mettant en scène vos waifus préférés !",
      more: "Rejoignez-nous maintenant et obtenez 1 tour gratuits sur notre nouveau jeu! Notre dernier jeu de machines à sous associe de superbes dessins d'anime à des mécanismes de jeu passionnants. Les caractéristiques incluent :\n- Plusieurs tours de bonus\n- Des jackpots progressifs\n- Des multiplicateurs de tours gratuits\n- Un système unique de collection de waifu\nNe manquez pas cette incroyable expérience de jeu!"
  },
  {
      id: 2,
      title: "Bonus de week-end spécial",
      user: "huh(pact)",
      date: "2025-01-30",
      description: "Doublez vos dépôts ce week-end grâce à notre événement bonus spécial!",
      more: "Préparez-vous à un week-end de bonus extraordinaires:\n- 100% de bonus sur dépôt jusqu'à 1000$\n- 50 tours gratuits sur une sélection de jeux\n- Tournoi spécial avec une cagnotte de 10 000$\n- Récompenses VIP exclusives\n- La promotion se déroule du vendredi 00:00 au dimanche 23:59. Les termes et conditions s'appliquent."
  },
  {
      id: 3,
      title: "Nouveaux modes de paiement",
      user: "huh(pact)",
      date: "2025-01-30",
      description: "Nous avons ajouté de nouvelles méthodes de paiement pratiques pour nos joueurs.",
      more: "Nous sommes ravis d'annoncer de nouvelles options de paiement:\n- Principales cryptocurrencies (BTC, ETH, XRP, SOL)\n- Portefeuilles électroniques populaires\n- Virements bancaires instantanés\n- Solutions de paiement mobile\n- Toutes les nouvelles méthodes de paiement offrent un traitement instantané et des frais peu élevés!"
  }
];

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function createNewsHTML(newsItem) {
  return `
      <article class="news__item">
          <h2 class="news__title">${newsItem.title}</h2>
          <div class="news__meta">
              <span class="news__user">Par ${newsItem.user}</span>
              <span class="news__date">${formatDate(newsItem.date)}</span>
          </div>
          <p class="news__description">${newsItem.description}</p>
          <button class="news__more" onclick="openModal(${newsItem.id})">Lire plus</button>
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
