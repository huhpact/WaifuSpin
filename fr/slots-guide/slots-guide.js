class CardTilt {
	constructor() {
			this.cards = document.querySelectorAll('[data-tilt]');
			this.init();
	}

	init() {
			this.cards.forEach(card => {
					card.addEventListener('mousemove', (e) => {
							const rect = card.getBoundingClientRect();
							const x = e.clientX - rect.left;
							const y = e.clientY - rect.top;
							
							const centerX = rect.width / 2;
							const centerY = rect.height / 2;
							
							const rotateX = (y - centerY) / 10;
							const rotateY = (centerX - x) / 10;
						
					});

					card.addEventListener('mouseleave', () => {
							gsap.to(card, {
									rotateX: 0,
									rotateY: 0,
									duration: 0.5,
									ease: 'power2.out'
							});
					});
			});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new CardTilt();
});