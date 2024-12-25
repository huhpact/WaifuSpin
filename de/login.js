document.addEventListener('DOMContentLoaded', () => {
	const formContainer = document.querySelector('.form-container');
	const formTitle = document.getElementById('formTitle');
	const authForm = document.getElementById('authForm');
	const toggleBtn = document.querySelector('.toggle-btn');
	const toggleText = document.querySelector('.toggle-text');
	const submitBtn = document.querySelector('.submit-btn span');
	const nameInput = document.querySelector('.name-input');
	let isLogin = true;

	
	const stats = [
			{ element: document.querySelector('.stat-number'), target: 3, suffix: 'k+' },
			{ element: document.querySelectorAll('.stat-number')[1], target: 10, suffix: '+' },
			{ element: document.querySelectorAll('.stat-number')[2], target: 24, suffix: '/7' }
	];
	
	let animated = false;
	
	function animateNumber(element, target, duration = 2000) {
			const start = 0;
			const increment = target / (duration / 16);
			let current = start;
			
			const updateNumber = () => {
					current += increment;
					if (current >= target) {
							element.textContent = target.toString();
							return;
					}
					
					if (Number.isInteger(target)) {
							element.textContent = Math.floor(current).toString();
					} else {
							element.textContent = current.toFixed(1);
					}
					
					requestAnimationFrame(updateNumber);
			};
			
			updateNumber();
	}
	
	function isInViewport(element) {
			const rect = element.getBoundingClientRect();
			return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			);
	}
	
	function checkAndAnimateStats() {
			if (animated) return;
			
			const statsSection = document.querySelector('.stats');
			if (isInViewport(statsSection)) {
					stats.forEach(stat => {
							animateNumber(stat.element, stat.target);
							if (stat.suffix) {
									setTimeout(() => {
											stat.element.textContent += stat.suffix;
									}, 2000);
							}
					});
					animated = true;
					window.removeEventListener('scroll', checkAndAnimateStats);
			}
	}
	
	window.addEventListener('scroll', checkAndAnimateStats);
	checkAndAnimateStats();

	const toggleForm = () => {
			formContainer.classList.add('animating');
			
			setTimeout(() => {
					isLogin = !isLogin;
					formTitle.textContent = isLogin ? 'Willkommen zurück' : 'Einen Account erstellen';
					toggleText.firstChild.textContent = isLogin ? "Sie haben noch keinen Account? " : 'Sie haben bereits ein Konto? ';
					toggleBtn.textContent = isLogin ? "Registrieren" : "Se connecter";
					submitBtn.textContent = isLogin ? "Se connecter" : "S'inscrire";
					nameInput.style.display = isLogin ? 'none' : 'block';
					
					formContainer.classList.remove('animating');
			}, 300);
	};

	toggleBtn.addEventListener('click', toggleForm);

	authForm.addEventListener('submit', (e) => {
			e.preventDefault();
			console.log('Form submitted:', isLogin ? 'Login' : 'Sign Up');
	});

	const inputs = document.querySelectorAll('input');
	inputs.forEach(input => {
			input.addEventListener('focus', () => {
					input.parentElement.style.transform = 'scale(1.02)';
			});
			
			input.addEventListener('blur', () => {
					input.parentElement.style.transform = 'scale(1)';
			});
	});
});

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