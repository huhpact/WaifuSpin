	document.querySelectorAll('a').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
					e.preventDefault();
					const targetId = this.getAttribute('href');
					const targetSection = document.querySelector(targetId);
					
					window.scrollTo({
							top: targetSection.offsetTop,
							behavior: 'smooth'
					});
			});
	});

	const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px'
	};

	const animateOnScroll = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
					if (entry.isIntersecting) {
							entry.target.style.opacity = '1';
							entry.target.style.transform = 'translateY(0)';
							animateOnScroll.unobserve(entry.target);
					}
			});
	}, observerOptions);

	document.querySelectorAll('.crypto-card').forEach((card, index) => {
			card.style.opacity = '0';
			card.style.transform = 'translateY(50px)';
			card.style.transition = `all 0.6s ease ${index * 0.1}s`;
			animateOnScroll.observe(card);
	});

	const progressBars = document.querySelectorAll('.progress');
	progressBars.forEach(bar => {
			const width = bar.style.width;
			bar.style.width = '0';
			setTimeout(() => {
					bar.style.width = width;
			}, 500);
	});

	const hero = document.querySelector('.hero');
	window.addEventListener('scroll', () => {
			const scrolled = window.pageYOffset;
			hero.style.transform = `translateY(${scrolled * 0.5}px)`;
	});