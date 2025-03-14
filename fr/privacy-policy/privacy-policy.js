document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('.policy__section');
	
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
			section.style.opacity = '0';
			section.style.transform = 'translateY(20px)';
			section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
			observer.observe(section);
	});
});