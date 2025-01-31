document.addEventListener('DOMContentLoaded', () => {
	const hero = document.querySelector('.hero');
	let lastScrollY = window.scrollY;
	
	window.addEventListener('scroll', () => {
			const currentScrollY = window.scrollY;

			if (hero.getBoundingClientRect().bottom > 0) {
					const opacity = 1 - (currentScrollY / hero.offsetHeight);
					hero.style.transform = `translateY(${currentScrollY * 0.5}px)`;
					hero.style.opacity = Math.max(opacity, 0);
			}
			
			document.querySelectorAll('.game-detail-section').forEach(section => {
					const rect = section.getBoundingClientRect();
					if (rect.top < window.innerHeight && rect.bottom > 0) {
							const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
							section.style.backgroundPositionY = `${progress * 50}%`;
							
							if (progress > 0.2 && !section.classList.contains('active')) {
									section.classList.add('active');
							}
					}
			});
			
			lastScrollY = currentScrollY;
	});

	const createParticle = () => {
			const particle = document.createElement('div');
			particle.classList.add('particle');
			particle.style.left = Math.random() * 100 + 'vw';
			particle.style.animationDuration = Math.random() * 3 + 2 + 's';
			document.body.appendChild(particle);

			setTimeout(() => {
					particle.remove();
			}, 5000);
	};

	setInterval(createParticle, 300);

	const observerOptions = {
			threshold: 0.2,
			rootMargin: '0px'
	};

	const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							entry.target.classList.add('active');

							if (entry.target.classList.contains('game-detail-section')) {
									const features = entry.target.querySelectorAll('.feature');
									features.forEach((feature, index) => {
											setTimeout(() => {
													feature.classList.add('fade-in');
											}, index * 200);
									});

									const stats = entry.target.querySelectorAll('.stat');
									stats.forEach((stat, index) => {
											setTimeout(() => {
													stat.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
											}, (features.length * 200) + (index * 200));
									});
							}
					}
			});
	}, observerOptions);

	document.querySelectorAll('.game-detail-section').forEach(section => {
			observer.observe(section);
	});

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
					e.preventDefault();
					const target = document.querySelector(this.getAttribute('href'));
					if (target) {
							target.scrollIntoView({
									behavior: 'smooth',
									block: 'start'
							});
					}
			});
	});

	document.querySelectorAll('button').forEach(button => {
			button.addEventListener('mousemove', (e) => {
					const rect = button.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					
					button.style.setProperty('--x', `${x}px`);
					button.style.setProperty('--y', `${y}px`);
			});
	});

	document.querySelectorAll('.game-card').forEach(card => {
			card.addEventListener('mouseenter', () => {
					const content = card.querySelector('.game-content');
					content.style.transform = 'scale(1.1)';
			});

			card.addEventListener('mouseleave', () => {
					const content = card.querySelector('.game-content');
					content.style.transform = 'scale(1)';
			});

			card.addEventListener('click', (e) => {
					if (!e.target.classList.contains('play-button')) {
							const rect = card.getBoundingClientRect();
							const x = e.clientX - rect.left;
							const y = e.clientY - rect.top;
							
							const ripple = document.createElement('div');
							ripple.classList.add('ripple');
							ripple.style.left = `${x}px`;
							ripple.style.top = `${y}px`;
							
							card.appendChild(ripple);
							
							setTimeout(() => ripple.remove(), 600);
					}
			});
	});

	document.querySelectorAll('.game-detail-section').forEach(section => {
			const content = section.querySelector('.game-detail-content');
			content.style.opacity = '0';
			content.style.transform = 'translateY(50px)';
	});
});