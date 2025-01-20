document.addEventListener('DOMContentLoaded', function () {
	const banner = document.getElementById('cookie-banner');


	if (document.cookie.includes('cookies-accepted=true') || document.cookie.includes('cookies-accepted=false')) {
			banner.style.display = 'none';
	}

	function hideBanner() {
			banner.classList.add('hidden');
			setTimeout(() => {
					banner.style.display = 'none';
			}, 500); 
	}

	document.getElementById('accept-cookies').addEventListener('click', function () {
			document.cookie = "cookies-accepted=true; path=/; max-age=" + (60 * 60 * 24 * 365);
			hideBanner();
	});

	document.getElementById('decline-cookies').addEventListener('click', function () {
			document.cookie = "cookies-accepted=false; path=/; max-age=" + (60 * 60 * 24 * 365); 
			hideBanner();
	});
});