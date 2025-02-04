const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					entry.target.classList.add('slide-in');
			}
	});
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
	observer.observe(section);
});

function updateTimers() {
	document.querySelectorAll('.timer').forEach(timer => {
			let seconds = parseInt(timer.dataset.time);
			if (seconds > 0) {
					seconds--;
					timer.dataset.time = seconds;
					
					const hours = Math.floor(seconds / 3600);
					const minutes = Math.floor((seconds % 3600) / 60);
					const secs = seconds % 60;
					
					timer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
			}
	});
}

setInterval(updateTimers, 1000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			const startPosition = window.pageYOffset;
			const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
			const distance = targetPosition - startPosition;
			const duration = 1000;
			let start = null;

			function animation(currentTime) {
					if (start === null) start = currentTime;
					const timeElapsed = currentTime - start;
					const progress = Math.min(timeElapsed / duration, 1);

					const ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t;
					
					window.scrollTo(0, startPosition + distance * ease(progress));
					
					if (timeElapsed < duration) {
							requestAnimationFrame(animation);
					}
			}

			requestAnimationFrame(animation);
	});
});

document.querySelectorAll('button').forEach(button => {
	button.addEventListener('click', function(e) {
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size/2;
			const y = e.clientY - rect.top - size/2;
			
			ripple.style.width = ripple.style.height = `${size}px`;
			ripple.style.left = `${x}px`;
			ripple.style.top = `${y}px`;
			ripple.classList.add('ripple');
			
			this.appendChild(ripple);
			
			setTimeout(() => {
					ripple.remove();
			}, 600);

			if (this.classList.contains('spin-btn') || 
					this.classList.contains('draw-btn')) {
					
					const originalText = this.textContent;
					this.textContent = 'Entered!';
					this.classList.add('entered');

					const card = this.closest('.giveaway-card');
					card.style.transform = 'rotateY(360deg)';
					card.style.transition = 'transform 1s ease';
					
					setTimeout(() => {
							card.style.transform = '';
							const prizes = [
									'50 Free Spins',
									'$100 Bonus',
									'Premium Waifu Card',
									'VIP Status Upgrade',
									'100% Deposit Bonus'
							];
							const prize = prizes[Math.floor(Math.random() * prizes.length)];
							alert(`🎉 Congratulations! You won ${prize}!`);
					}, 1000);
			}
	});
});

function animateProgress() {
	document.querySelectorAll('.progress').forEach(progress => {
			const width = progress.style.width;
			progress.style.width = '0';
		
			progress.style.background = 'linear-gradient(90deg, #5f94ff, #0900ab, #5f94ff)';
			progress.style.backgroundSize = '200% 100%';
			progress.style.animation = 'gradientFlow 2s linear infinite';
			
			setTimeout(() => {
					progress.style.width = width;
			}, 100);
	});
}

const progressStyle = document.createElement('style');
progressStyle.textContent = `
	@keyframes gradientFlow {
			0% { background-position: 100% 0; }
			100% { background-position: -100% 0; }
	}
`;
document.head.appendChild(progressStyle);

const competitionSection = document.querySelector('#competitions');
const progressObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
			if (entry.isIntersecting) {
					animateProgress();
			}
	});
}, { threshold: 0.1 });

progressObserver.observe(competitionSection);

window.addEventListener('scroll'), () => { {
	const hero = document.querySelector('.hero');
	const scrolled = window.scrollY;
	const rate = scrolled * 0.5;
	
	if (hero) {
			hero.style.transform = `translateY(${rate}px)`;
	}
}};

document.querySelectorAll('.glass-card').forEach(card => {
	card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const angleX = (y - centerY) / 20;
			const angleY = (centerX - x) / 20;
			
			card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
	});
	
	card.addEventListener('mouseleave', () => {
			card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
	});
});

document.querySelectorAll('.prize-amount').forEach(prize => {
	const finalAmount = parseInt(prize.textContent.replace(/[^0-9]/g, ''));
	let currentAmount = 0;
	const duration = 2000;
	const increment = finalAmount / (duration / 16);
	
	function updateAmount() {
			if (currentAmount < finalAmount) {
					currentAmount = Math.min(currentAmount + increment, finalAmount);
					prize.textContent = `¥${Math.floor(currentAmount).toLocaleString()}`;
					requestAnimationFrame(updateAmount);
			}
	}
	
	const prizeObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							updateAmount();
					}
			});
	}, { threshold: 0.5 });
	
	prizeObserver.observe(prize);
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
	let current = '';
	
	sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= sectionTop - sectionHeight / 3) {
					current = section.getAttribute('id');
			}
	});
	
	navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href').slice(1) === current) {
					link.classList.add('active');
			}
	});
});
