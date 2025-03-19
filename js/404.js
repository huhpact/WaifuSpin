
const translations = {
	fr: {
			description: "Il semble que vous vous soyez aventuré en territoire inconnu. Notre casino numérique ne s'étend pas jusque-là, mais l'action vous attend toujours aux tables principales.",
			button: "Retour au Casino →"
	},
	en: {
			description: "Looks like you've ventured into uncharted territory. Our digital casino floor doesn't extend this far, but the action's still waiting for you back at the main tables.",
			button: "Return to Casino Floor →"
	},
	de: {
			description: "Sieht aus, als hätten Sie sich in unbekanntes Gebiet gewagt. Unser digitales Casino erstreckt sich nicht bis hierher, aber an den Haupttischen wartet noch immer die Action auf Sie.",
			button: "Zurück zum Casino →"
	},
	ja: {
			description: "未知の領域に迷い込んでしまったようです。デジタルカジノフロアはここまでは広がっていませんが、メインテーブルではまだアクションが待っています。",
			button: "カジノフロアに戻る →"
	}
};

function getBrowserLanguage() {
	const lang = navigator.language.split('-')[0];
	const supportedLanguages = ['fr', 'en', 'de', 'ja'];
	return supportedLanguages.includes(lang) ? lang : 'fr';
}

function setContent() {
	const lang = getBrowserLanguage();
	const content = translations[lang];
	
	document.querySelector('.description').textContent = content.description;
	document.querySelector('.cta__button').textContent = content.button;
	document.documentElement.lang = lang;
}

class Particle {
	constructor(x, y) {
			this.x = x;
			this.y = y;
			this.size = Math.random() * 3 + 1;
			this.speedX = Math.random() * 2 - 1;
			this.speedY = Math.random() * 2 - 1;
			this.opacity = Math.random() * 0.5 + 0.2;
	}

	update() {
			this.x += this.speedX;
			this.y += this.speedY;

			if (this.size > 0.2) this.size -= 0.1;
	}

	draw(ctx) {
			ctx.fillStyle = `rgba(33, 150, 243, ${this.opacity})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
	}
}

class ParticleEffect {
	constructor(canvas) {
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d');
			this.particles = [];
			this.mouse = {
					x: null,
					y: null,
					radius: 100
			};

			window.addEventListener('mousemove', (e) => {
					const rect = canvas.getBoundingClientRect();
					this.mouse.x = e.clientX - rect.left;
					this.mouse.y = e.clientY - rect.top;
			});

			window.addEventListener('resize', () => this.resize());
			this.resize();
			this.init();
			this.animate();
	}

	resize() {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
	}

	init() {
			for (let i = 0; i < 100; i++) {
					this.particles.push(new Particle(
							Math.random() * this.canvas.width,
							Math.random() * this.canvas.height
					));
			}
	}

	animate() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			
			this.particles.forEach((particle, index) => {
					particle.update();
					particle.draw(this.ctx);

					if (particle.size <= 0.2) {
							this.particles.splice(index, 1);
							this.particles.push(new Particle(
									Math.random() * this.canvas.width,
									Math.random() * this.canvas.height
							));
					}
			});

			requestAnimationFrame(() => this.animate());
	}
}

const canvas = document.createElement('canvas');
canvas.classList.add('particles');
document.querySelector('.animation__container').appendChild(canvas);
new ParticleEffect(canvas);

const glitchWrapper = document.querySelector('.glitch__wrapper');
glitchWrapper.addEventListener('mouseover', () => {
	const glitchAnim = glitchWrapper.animate([
			{ transform: 'translate(-2px, 2px)' },
			{ transform: 'translate(2px, -2px)' },
			{ transform: 'translate(-2px, -2px)' },
			{ transform: 'translate(2px, 2px)' }
	], {
			duration: 100,
			iterations: 2
	});
});

setContent();