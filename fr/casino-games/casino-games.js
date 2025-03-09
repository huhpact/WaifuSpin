const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					
					const section = entry.target.closest('.game__section');
					if (section) {
							const preview = section.querySelector('.game__preview');
							if (preview) {
									preview.style.transform = 'translateZ(30px)';
							}
					}
			}
	});
}, {
	threshold: [0.1, 0.5, 1],
	rootMargin: '-50px'
});

document.querySelectorAll('.game__content').forEach(content => {
	observer.observe(content);
});

document.querySelectorAll('.play__btn').forEach(button => {
	button.addEventListener('mouseover', () => {
			button.style.transform = 'translateY(-5px)';
	});
	
	button.addEventListener('mouseout', () => {
			button.style.transform = 'translateY(0)';
	});
	
	button.addEventListener('click', (e) => {
			const rect = button.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const ripple = document.createElement('span');
			ripple.style.left = `${x}px`;
			ripple.style.top = `${y}px`;
			ripple.classList.add('ripple');
			
			button.appendChild(ripple);
			
			setTimeout(() => ripple.remove(), 1000);
			
			button.style.transform = 'scale(0.95)';
			setTimeout(() => button.style.transform = '', 150);
	});
});

const stats = document.querySelectorAll('.stat__value');
stats.forEach(stat => {
	const target = parseFloat(stat.textContent.replace(/[^0-9.]/g, ''));
	let current = 0;
	const increment = target / 100;
	const duration = 2000; 
	const steps = 100;
	const step = duration / steps;
	
	function updateCounter() {
			current += increment;
			if (current < target) {
					if (stat.textContent.includes('€')) {
							stat.textContent = '€' + Math.floor(current) + 'K';
					} else if (stat.textContent.includes('%')) {
							stat.textContent = Math.floor(current * 10) / 10 + '%';
					} else {
							stat.textContent = Math.floor(current) + 'M+';
					}
					setTimeout(updateCounter, step);
			}
	}

	const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							updateCounter();
							observer.unobserve(entry.target);
					}
			});
	});
	
	observer.observe(stat);
});

window.addEventListener('scroll', () => {
	const sections = document.querySelectorAll('.game__section');
	sections.forEach(section => {
			const rect = section.getBoundingClientRect();
			const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
			
			if (scrollPercent > 0 && scrollPercent < 1) {
					const bg = section.querySelector('.parallax-bg');
					if (bg) {
							bg.style.transform = `translateY(${scrollPercent * 50}px) scale(1.2)`;
					}
			}
	});
});