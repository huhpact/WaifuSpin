document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
			});
	});
});

const observerOptions = {
	threshold: 0.2,
	rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					
					if (entry.target.classList.contains('stat')) {
							const numberElement = entry.target.querySelector('.stat-number');
							if (numberElement) {
									const endValue = parseInt(numberElement.getAttribute('data-value'));
									animateNumber(numberElement, endValue);
							}
					}
			}
	});
}, observerOptions);

document.querySelectorAll('.feature-card, .stat, .features h2').forEach(el => {
	observer.observe(el);
});

function animateNumber(element, endValue) {
	const duration = 2000;
	const startValue = 0;
	const startTime = performance.now();
	
	function updateNumber(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			
			const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
			element.textContent = currentValue.toLocaleString();
			
			if (progress < 1) {
					requestAnimationFrame(updateNumber);
			}
	}
	
	requestAnimationFrame(updateNumber);
}

let lastScroll = 0;
let scrollTimeout;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset;
	
	clearTimeout(scrollTimeout);
	
	if (currentScroll <= 0) {
			header.classList.remove('scroll-up');
			header.classList.remove('scroll-down');
			return;
	}
	
	if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
			header.classList.remove('scroll-up');
			header.classList.add('scroll-down');
	} else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
			header.classList.remove('scroll-down');
			header.classList.add('scroll-up');
	}

	scrollTimeout = setTimeout(() => {
			lastScroll = currentScroll;
	}, 50);
});

document.querySelectorAll('.promo-card .cta-btn').forEach(button => {
	button.addEventListener('click', function() {
			const promoCode = this.parentElement.querySelector('.promo-code').textContent;
			navigator.clipboard.writeText(promoCode).then(() => {
					const originalText = this.textContent;
					this.textContent = 'Copied!';
					setTimeout(() => {
							this.textContent = originalText;
					}, 2000);
			});
	});
});