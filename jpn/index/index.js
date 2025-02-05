document.addEventListener("DOMContentLoaded", () => {
  const games = ["ブラックジャック", "スロット", "ルーレット・ホイール"];
  const users = [" 覆面"];

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
	onlineUsersElement.textContent = `${randomUsers} オンラインユーザー`;
}

document.addEventListener("DOMContentLoaded", () => {
	updateOnlineUsers();
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


document.addEventListener('DOMContentLoaded', function () {
	const banner = document.getElementById('cookie-banner');


	if (document.cookie.includes('cookies-accepted=true') || document.cookie.includes('cookies-accepted=false')) {
			banner.style.display = 'none';
	}

	function hideBanner() {
			banner.classList.add('hidden');
			setTimeout(() => {
					banner.style.display = 'none';
			}, 500); 
	}

	document.getElementById('accept-cookies').addEventListener('click', function () {
			document.cookie = "cookies-accepted=true; path=/; max-age=" + (60 * 60 * 24 * 365);
			hideBanner();
	});

	document.getElementById('decline-cookies').addEventListener('click', function () {
			document.cookie = "cookies-accepted=false; path=/; max-age=" + (60 * 60 * 24 * 365); 
			hideBanner();
	});
});
