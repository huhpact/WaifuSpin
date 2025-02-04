const observerOptions = {
	threshold: 0.1,
	rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					entry.target.classList.add('fade-in');
					observer.unobserve(entry.target);
			}
	});
}, observerOptions);

document.querySelectorAll('.provider-card, .stat-card').forEach(element => {
	observer.observe(element);
});

document.querySelectorAll('.game-item').forEach(game => {
	game.addEventListener('mousemove', (e) => {
			const bounds = game.getBoundingClientRect();
			const mouseX = e.clientX - bounds.left;
			const mouseY = e.clientY - bounds.top;
			
			const centerX = bounds.width / 2;
			const centerY = bounds.height / 2;
			
			const angleX = (mouseY - centerY) / 30;
			const angleY = (centerX - mouseX) / 20;
			
			const glowX = (mouseX / bounds.width) * 100;
			const glowY = (mouseY / bounds.height) * 100;
			
			game.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
			game.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(95, 148, 255, 0.2), transparent)`;
	});
	
	game.addEventListener('mouseleave', () => {
			game.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
			game.style.background = 'none';
	});
});

document.querySelectorAll('.provider-features li').forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.1}s`;
});

const stats = document.querySelectorAll('.stat-number');
const animateValue = (element, start, end, duration) => {
	const range = end - start;
	const increment = range / (duration / 16);
	let current = start;
	
	const updateValue = () => {
			current += increment;
			if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
					element.textContent = end + (element.dataset.suffix || '');
					return;
			}
			element.textContent = Math.floor(current) + (element.dataset.suffix || '');
			requestAnimationFrame(updateValue);
	};
	
	updateValue();
};

const statsObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					const target = entry.target;
					const endValue = parseInt(target.textContent);
					animateValue(target, 0, endValue, 2000);
					statsObserver.unobserve(target);
			}
	});
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));