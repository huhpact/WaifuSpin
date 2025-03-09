const scrollReveal = () => {
	const elements = document.querySelectorAll('.scroll__reveal');
	
	const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							entry.target.classList.add('visible');
					}
			});
	}, {
			threshold: 0.1
	});

	elements.forEach(element => {
			observer.observe(element);
	});
};

const initSmoothScroll = () => {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
					e.preventDefault();
					document.querySelector(this.getAttribute('href')).scrollIntoView({
							behavior: 'smooth'
					});
			});
	});
};

document.addEventListener('DOMContentLoaded', () => {
	scrollReveal();
	initSmoothScroll();
});