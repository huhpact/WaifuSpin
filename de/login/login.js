document.addEventListener('DOMContentLoaded', () => {
	const loginForm = document.querySelector('.form-box.login');
	const registerForm = document.querySelector('.form-box.register');
	const switchBtns = document.querySelectorAll('.switch-btn');
	const passwordToggles = document.querySelectorAll('.toggle-password');
	const forms = document.querySelectorAll('form');

	switchBtns.forEach(btn => {
			btn.addEventListener('click', (e) => {
					e.preventDefault();
					const target = btn.dataset.target;
					
					if (target === 'register') {
							loginForm.classList.remove('active');
							loginForm.classList.add('inactive');
							registerForm.classList.add('active');
							registerForm.classList.remove('inactive');
					} else {
							registerForm.classList.remove('active');
							registerForm.classList.add('inactive');
							loginForm.classList.add('active');
							loginForm.classList.remove('inactive');
					}
			});
	});

	forms.forEach(form => {
			form.addEventListener('submit', async (e) => {
					e.preventDefault();
					
					if (validateForm(form)) {
							const submitBtn = form.querySelector('.submit-btn');
							submitBtn.classList.add('loading');

							await new Promise(resolve => setTimeout(resolve, 2000));
							
							submitBtn.classList.remove('loading');
							showSuccess(form);
					}
			});

			const inputs = form.querySelectorAll('input');
			inputs.forEach(input => {
					input.addEventListener('input', () => {
							validateInput(input);
					});

					input.addEventListener('blur', () => {
							validateInput(input);
					});
			});
	});

	function validateForm(form) {
			let isValid = true;
			const inputs = form.querySelectorAll('input');
			
			inputs.forEach(input => {
					if (!validateInput(input)) {
							isValid = false;
					}
			});

			if (form.id === 'registerForm') {
					const password = form.querySelector('input[type="password"]');
					const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
					
					if (password.value !== confirmPassword.value) {
							showError(confirmPassword, 'Passwörter stimmen nicht überein');
							isValid = false;
					}
			}

			return isValid;
	}

	function validateInput(input) {
			const inputField = input.parentElement;
			
			inputField.classList.remove('error');
			const existingError = inputField.querySelector('.error-message');
			if (existingError) {
					existingError.remove();
			}

			if (input.value.trim() === '') {
					showError(input, 'Dieses Feld ist erforderlich');
					return false;
			}

			if (input.type === 'email' && !isValidEmail(input.value)) {
					showError(input, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
					return false;
			}

			if (input.type === 'password' && input.value.length < 6) {
					showError(input, 'Das Passwort muss mindestens 6 Zeichen lang sein');
					return false;
			}

			return true;
	}

	function showError(input, message) {
			const inputField = input.parentElement;
			inputField.classList.add('error');
			
			const errorMessage = document.createElement('span');
			errorMessage.classList.add('error-message');
			errorMessage.textContent = message;
			inputField.appendChild(errorMessage);
	}

	function showSuccess(form) {
			const submitBtn = form.querySelector('.submit-btn');
			const originalContent = submitBtn.innerHTML;
			
			submitBtn.innerHTML = '<i class="fas fa-check success-checkmark"></i>';
			submitBtn.style.backgroundColor = '#4CAF50';
			
			setTimeout(() => {
					submitBtn.innerHTML = originalContent;
					submitBtn.style.backgroundColor = '';
					form.reset();
			}, 2000);
	}

	function isValidEmail(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	loginForm.classList.add('active');
	registerForm.classList.add('inactive');
});