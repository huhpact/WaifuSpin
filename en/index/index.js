document.addEventListener("DOMContentLoaded", () => {
  const games = ["Mines", "Slots", "Double or Nothing", "Limbo"];
  const users = [" Hidden"];

  function generateTableRow() {
    const table = document.getElementById("stats__data");
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
    const loadingScreen = document.getElementById("loading__screen");
    const mainContent = document.getElementById("main__content");

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
	const onlineUsersElement = document.getElementById('online__users');
	const randomUsers = getRandomOnlineUsers(560, 2531);
	onlineUsersElement.textContent = `${randomUsers} users online`;
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
