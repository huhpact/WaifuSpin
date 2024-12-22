

document.addEventListener("DOMContentLoaded", () => {
	const promos = [
			{
					title: "Tombolas & Courses",
					description: "Participez au tirage au sort pour gagner 75K chaque semaine. Et gagnez gros lors des courses quotidiennes.",
					media: "assets/image.png",
			},
			{
					title: "Promotions",
					description: "Profitez au maximum de nos promotions de casino et de nos bonus de paris sportifs qui sont mis à jour chaque semaine.",
					media: "assets/image copy.png",
			},
			{
					title: "Haut retour aux joueurs (RTP)",
					description: "Avec des pourcentages de RTP améliorés, vous avez une chance de gagner gros à chaque fois que vous jouez.",
					media: "assets/image copy 2.png",
			},
	];

	let currentIndex = 0;

	const titleElement = document.querySelector(".promo-info h3");
	const descriptionElement = document.querySelector(".promo-info p");
	const mediaElement = document.querySelector(".promo-media img");
	const promoInfoElement = document.querySelector(".promo-info");
	const leftArrow = document.querySelector(".left-arrow");
	const rightArrow = document.querySelector(".right-arrow");

	function updateGallery(index, direction) {
		
			promoInfoElement.classList.add("hidden");
			mediaElement.classList.add("hidden");

			setTimeout(() => {
					
					const promo = promos[index];
					titleElement.textContent = promo.title;
					descriptionElement.textContent = promo.description;
					mediaElement.src = promo.media;
					mediaElement.alt = promo.title;

					
					promoInfoElement.classList.remove("hidden", "new");
					mediaElement.classList.remove("hidden");

					
					promoInfoElement.classList.add("new");
					setTimeout(() => {
							promoInfoElement.classList.remove("new");
					}, 500);
			}, 500);
	}

	leftArrow.addEventListener("click", () => {
			currentIndex = (currentIndex - 1 + promos.length) % promos.length;
			updateGallery(currentIndex, "left");
	});

	rightArrow.addEventListener("click", () => {
			currentIndex = (currentIndex + 1) % promos.length;
			updateGallery(currentIndex, "right");
	});

	
	updateGallery(currentIndex, "right");
});


document.addEventListener("DOMContentLoaded", () => {
  const games = ["Blackjack", "Slots", "Roulette"];
  const users = [" Masqué"];

  function generateTableRow() {
    const table = document.getElementById("stats-data");
    const row = document.createElement("tr");

    const game = games[Math.floor(Math.random() * games.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const time = new Date().toLocaleTimeString();
    const amount = (Math.random() * 100).toFixed(2);

    row.innerHTML = `<td>${game}</td><td><i class='bx bxs-user'></i>${user}</td><td>${time}</td><td>€${amount}</td>`;
    table.appendChild(row);

    if (table.rows.length > 7) {
      table.deleteRow(0); 
    }
  }

  
  setInterval(generateTableRow, 3000);


  for (let i = 0; i < 3; i++) {
    generateTableRow();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  const toggleSidebar = () => {
    const isActive = sidebar.classList.contains('active');
    sidebar.classList.toggle('active', !isActive);
    overlay.classList.toggle('active', !isActive);
  };

  const closeSidebar = (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnBurger = burgerMenu.contains(event.target);
    if (!isClickInsideSidebar && !isClickOnBurger) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  };

  burgerMenu.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('click', closeSidebar); 
});

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    if (localStorage.getItem("hasSeenLoader")) {
        loadingScreen.style.display = "none";
        mainContent.classList.remove("hidden");
    } else {
        localStorage.setItem("hasSeenLoader", "true");
        setTimeout(() => {
            loadingScreen.style.display = "none";
            mainContent.classList.remove("hidden");
        }, 3000); 
    }
});

function getRandomOnlineUsers(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateOnlineUsers() {
	const onlineUsersElement = document.getElementById('online-users');
	const randomUsers = getRandomOnlineUsers(560, 2531);
	onlineUsersElement.textContent = `${randomUsers} utilisateurs en ligne`;
}

document.addEventListener("DOMContentLoaded", () => {
	updateOnlineUsers();
});

function handleIntersection(entries) {
	entries.forEach(entry => {
		const target = entry.target.querySelector('span');
		if (entry.isIntersecting) {
			target.classList.add('highlight');
		} else {
			target.classList.remove('highlight');
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	updateOnlineUsers();


	const supportHeading = document.getElementById('support-heading');
	const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
	observer.observe(supportHeading);

	
	const text = supportHeading.innerHTML;
	supportHeading.innerHTML = text.replace('votre langue', '<span>votre langue</span>');
});

let currentFeatureIndex = 0;
const features = document.querySelectorAll(".feature");

function showNextFeature() {
	if (currentFeatureIndex < features.length) {
		const feature = features[currentFeatureIndex];
		feature.classList.add("visible");

		feature.addEventListener("transitionend", () => {
			feature.style.animation = "fly-out 3s ease forwards";
		}, { once: true });

		currentFeatureIndex++;
	}
}

document.addEventListener("scroll", () => {
	const viewportHeight = window.innerHeight;
	const triggerPoint = viewportHeight / 2;

	const currentFeature = features[currentFeatureIndex];
	const rect = currentFeature.getBoundingClientRect();

	if (rect.top < triggerPoint && !currentFeature.classList.contains("visible")) {
		showNextFeature();
	}
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

window.onload = fetchBitcoinRate;