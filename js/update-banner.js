document.addEventListener('DOMContentLoaded', () => {
	const updateNotification = document.querySelector('.update__notification');
	const closeBtn = document.querySelector('.update__notification .close__btn');

	if (!updateNotification || !closeBtn) return;

	setTimeout(() => {
			updateNotification.classList.remove('hide'); 
	}, 1000);

	closeBtn.addEventListener('click', () => {
			hideNotification();
	});

	setTimeout(() => {
			hideNotification();
	}, 5000);

	function hideNotification() {
			if (updateNotification.classList.contains('hide')) return; 

			updateNotification.classList.add('hide');
			setTimeout(() => {
					updateNotification.remove();
			}, 500);
	}
});
