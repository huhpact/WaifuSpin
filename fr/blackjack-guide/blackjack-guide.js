document.addEventListener('DOMContentLoaded', () => {
	const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							entry.target.classList.add('show');
					}
			});
	}, {
			threshold: 0.2,
			rootMargin: '0px 0px -100px 0px'
	});

	document.querySelectorAll('.tutorial-section').forEach(section => {
			observer.observe(section);
	});

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
					e.preventDefault();
					document.querySelector(this.getAttribute('href')).scrollIntoView({
							behavior: 'smooth'
					});
			});
	});
});