document.addEventListener('DOMContentLoaded', () => {
	const i18n = new I18n();

	const canvas = document.querySelector('.particles');
	const ctx = canvas.getContext('2d');
	let particles = [];

	function resizeCanvas() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	class Particle {
			constructor() {
					this.reset();
			}

			reset() {
					this.x = Math.random() * canvas.width;
					this.y = Math.random() * canvas.height;
					this.size = Math.random() * 3 + 1;
					this.speedX = (Math.random() - 0.5) * 2;
					this.speedY = (Math.random() - 0.5) * 2;
					this.opacity = Math.random() * 0.5;
					this.growing = Math.random() > 0.5;
			}

			update() {
					this.x += this.speedX;
					this.y += this.speedY;

					if (this.growing) {
							this.opacity += 0.01;
							if (this.opacity >= 0.5) this.growing = false;
					} else {
							this.opacity -= 0.01;
							if (this.opacity <= 0) this.growing = true;
					}

					if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
							this.reset();
					}
			}

			draw() {
					ctx.beginPath();
					ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
					ctx.fillStyle = `rgba(95, 148, 255, ${this.opacity})`;
					ctx.fill();
			}
	}

	function createParticles() {
			for (let i = 0; i < 100; i++) {
					particles.push(new Particle());
			}
	}

	function animate() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			particles.forEach(particle => {
					particle.update();
					particle.draw();
			});
			requestAnimationFrame(animate);
	}

	createParticles();
	animate();

	const container = document.querySelector('.container');
	const content = document.querySelector('.content');
	const title = document.querySelector('.title');
	const orb = document.querySelector('.glowing__orb');

	document.addEventListener('mousemove', (e) => {
			const { clientX, clientY } = e;
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			
			const moveX = (clientX - centerX) / 40;
			const moveY = (clientY - centerY) / 40;

			content.style.transform = `
					translateX(${moveX}px) 
					translateY(${moveY}px)
					rotateX(${-moveY/2}deg)
					rotateY(${moveX/2}deg)
			`;

			title.style.transform = `
					translateX(${moveX * 1.5}px)
					translateY(${moveY * 1.5}px)
					translateZ(50px)
			`;

			orb.style.transform = `
					translate(${moveX * 2}px, ${moveY * 2}px)
					scale(${1 + Math.abs(moveX) / 500})
			`;
	});

	document.querySelectorAll('.chip').forEach((chip, index) => {
			chip.addEventListener('mouseenter', () => {
					chip.style.animationPlayState = 'paused';
					chip.style.transform = 'scale(1.2) translateZ(50px)';
					chip.style.boxShadow = '0 0 30px rgba(95, 148, 255, 0.5)';
			});
			
			chip.addEventListener('mouseleave', () => {
					chip.style.animationPlayState = 'running';
					chip.style.transform = '';
					chip.style.boxShadow = '';
			});

			chip.style.animationDelay = `${index * 0.2}s`;
	});
});