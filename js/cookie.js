document.addEventListener('DOMContentLoaded', () => {
	const banner = document.getElementById('cookie__banner');
	const acceptButton = document.getElementById('accept__cookies');
	const declineButton = document.getElementById('decline__cookies');

	const cookieChoice = localStorage.getItem('cookieChoice');
	
	if (!cookieChoice) {
			setTimeout(() => {
					banner.classList.remove('hidden');
					requestAnimationFrame(() => {
							banner.classList.add('show');
					});
			}, 1000);
	}

	function hideBanner() {
			banner.classList.remove('show');
			banner.classList.add('hide');
			setTimeout(() => {
					banner.classList.add('hidden');
			}, 300);
	}

	function handleCookieChoice(accepted) {
			localStorage.setItem('cookieChoice', accepted ? 'accepted' : 'declined');
			
			if (accepted) {
					console.log('Cookies accepted - initializing services');
			} else {
					console.log('Cookies declined - disabling services');
			}

			hideBanner();
	}

	acceptButton.addEventListener('click', () => handleCookieChoice(true));
	declineButton.addEventListener('click', () => handleCookieChoice(false));
});
