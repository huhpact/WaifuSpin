document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
					behavior: 'smooth'
			});
	});
});

document.querySelectorAll('.feature-card').forEach(card => {
	card.removeAttribute('onmouseover');
	card.removeAttribute('onmouseout');
});