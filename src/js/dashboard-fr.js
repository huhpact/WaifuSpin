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

const rechargeButton = document.getElementById('recharge-button');
const rechargePopup = document.getElementById('recharge-popup');
const closeRechargePopup = document.getElementById('close-recharge-popup');

rechargeButton.addEventListener('click', () => {
		rechargePopup.classList.toggle('hidden');
});

closeRechargePopup.addEventListener('click', () => {
		rechargePopup.classList.add('hidden');
});

document.querySelectorAll('#recharge-popup button[data-amount]').forEach(button => {
		button.addEventListener('click', (e) => {
				const amount = e.target.getAttribute('data-amount');
				alert(`Rechargé avec ${amount}€!`);
				rechargePopup.classList.add('hidden');
				// Balance aktualisieren (Beispiel, benötigt Session Management)
				const balanceSpan = document.getElementById('balance');
				balanceSpan.textContent = `Solde: ${parseInt(balanceSpan.textContent.split(' ')[1]) + parseInt(amount)}€`;
		});
});


const enterButton = document.getElementById('enter-tombola');
enterButton.addEventListener('click', () => {
		enterButton.textContent = "Entré";
});


const rankingButton = document.getElementById('ranking-button');
rankingButton.addEventListener('click', () => {
		alert("Classement:\n1. User123\n2. WaifuFan\n3. KawaiiLover");
});