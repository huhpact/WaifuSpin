const newsData = [
	{
			id: 1,
			title: "WaifuSpinが新しいスロットマシンを発表",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "アニメをテーマにした最新スロットゲームの興奮をお楽しみください！",
			more: "今すぐ参加して、新作ゲームの1フリースピンをゲットしよう！当社の最新スロットゲームは、美しいアニメのアートワークとエキサイティングなゲームプレイの仕組みが組み合わされています。特徴 - 複数のボーナスラウンド - プログレッシブジャックポット - フリースピンのマルチプライヤー - ユニークなwaifuコレクションシステム - この素晴らしいゲーム体験をお見逃しなく！"
	},
	{
			id: 2,
			title: "週末特別ボーナス",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "今週末のスペシャル・ボーナス・イベントで、ご入金が2倍に！",
			more: "最高$1,000までの100%入金ボーナス- 選択されたゲームで50回のフリースピン- 賞金総額$10,000の特別トーナメント- 特別VIP特典- プロモーションは金曜日00:00から日曜日23:59まで。利用規約が適用されます。"
	},
	{
			id: 3,
			title: "新しい支払い方法",
			user: "huh(pact)",
			date: "2025-01-30",
			description: "プレーヤーの皆様にとって便利な新しい支払い方法を追加しました。",
			more: "主要な暗号通貨（BTC、ETH、XRP、SOL） - 人気の電子ウォレット - インスタント銀行振込 - モバイル決済ソリューション - すべての新しい決済方法は、インスタント処理と低手数料を提供します！"
	}
];

function formatDate(dateString) {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function createNewsHTML(newsItem) {
	return `
			<article class="news-item">
					<h2 class="news-title">${newsItem.title}</h2>
					<div class="news-meta">
							<span class="news-user">による ${newsItem.user}</span>
							<span class="news-date">${formatDate(newsItem.date)}</span>
					</div>
					<p class="news-description">${newsItem.description}</p>
					<button class="news-more" onclick="openModal(${newsItem.id})">続きを読む</button>
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