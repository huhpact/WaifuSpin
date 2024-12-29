document.addEventListener('DOMContentLoaded', () => {
	const shareButton = document.getElementById('shareButton');
	const referralLink = document.getElementById('referralLink');

	shareButton.addEventListener('click', async () => {
			if (navigator.share) {
					try {
							await navigator.share({
									title: 'Join WaifuSpin',
									text: 'Join WaifuSpin using my referral link and get started with amazing bonuses!',
									url: referralLink.value
							});
					} catch (err) {
							console.log('Error sharing:', err);
					}
			} else {
					navigator.clipboard.writeText(referralLink.value).then(() => {
							shareButton.classList.add('copied');
							
							setTimeout(() => {
									shareButton.classList.remove('copied');
							}, 2000);
					}).catch(err => {
							console.log('Error copying to clipboard:', err);
					});
			}
	});
});