const observerOptions = {
	threshold: 0.2,
	rootMargin: '50px'
};

document.querySelectorAll('.card, .cert-logo, .feature-card').forEach(element => {
	observer.observe(element);
});

function animateStatValue(element) {
	const value = parseFloat(element.getAttribute('data-value'));
	const duration = 2000;
	const steps = 60;
	const stepValue = value / steps;
	let currentStep = 0;
	
	const interval = setInterval(() => {
			currentStep++;
			const currentValue = stepValue * currentStep;
			
			if (currentStep === steps) {
					element.textContent = value.toLocaleString();
					clearInterval(interval);
			} else {
					element.textContent = Math.round(currentValue).toLocaleString();
			}
	}, duration / steps);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			
			if (target) {
					const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
					const startPosition = window.pageYOffset;
					const distance = targetPosition - startPosition;
					const duration = 1000;
					let start = null;
					
					function animation(currentTime) {
							if (start === null) start = currentTime;
							const timeElapsed = currentTime - start;
							const progress = Math.min(timeElapsed / duration, 1);
							
							const easeProgress = progress < .5 ? 
									4 * progress * progress * progress : 
									1 - Math.pow(-2 * progress + 2, 3) / 2;
							
							window.scrollTo(0, startPosition + distance * easeProgress);
							
							if (progress < 1) {
									requestAnimationFrame(animation);
							}
					}
					
					requestAnimationFrame(animation);
			}
	});
});
