document.addEventListener('DOMContentLoaded', () => {
	const transitionElement = document.querySelector('.transition-element');
	const transitionLinks = document.querySelectorAll('a.transition');

	for (let i = 1; i <= 3; i++) {
			const layer = document.createElement('div');
			layer.className = `transition-layer layer-${i}`;
			transitionElement.appendChild(layer);
	}

	const ripple = document.createElement('div');
	ripple.className = 'ripple';
	transitionElement.appendChild(ripple);

	const imageContainer = document.createElement('div');
	imageContainer.className = 'transition-image';
	const image = document.createElement('img');
	image.src = '/images/loading.gif';
	image.alt = 'Waifu Transition';
	imageContainer.appendChild(image);
	transitionElement.appendChild(imageContainer);

	transitionLinks.forEach(link => {
			link.addEventListener('click', e => {
					e.preventDefault();
					const target = e.target.href;

					transitionElement.classList.add('active');

					setTimeout(() => {
							window.location.href = target;
					}, 1500);
			});
	});
});