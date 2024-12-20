

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

// Elemente auswählen
const burgerMenu = document.querySelector('.burger-menu');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

// Funktion: Sidebar toggeln
const toggleSidebar = () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
};

// Event-Listener hinzufügen
burgerMenu.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

