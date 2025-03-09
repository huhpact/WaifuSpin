document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('.policy__section');
	sections.forEach((section, index) => {
			section.style.setProperty('--delay', index);
	});

	const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							entry.target.style.opacity = '1';
							entry.target.style.transform = 'translateY(0)';
					}
			});
	}, {
			threshold: 0.1
	});

	sections.forEach(section => {
			observer.observe(section);
	});
});