document.addEventListener('DOMContentLoaded', () => {
	const formulaireConnexion = document.querySelector('.form-box.login');
	const formulaireInscription = document.querySelector('.form-box.register');
	const boutonsSwitch = document.querySelectorAll('.switch-btn');
	const togglesMotDePasse = document.querySelectorAll('.toggle-password');
	const formulaires = document.querySelectorAll('form');

	boutonsSwitch.forEach(btn => {
			btn.addEventListener('click', (e) => {
					e.preventDefault();
					const cible = btn.dataset.target;
					
					if (cible === 'register') {
							formulaireConnexion.classList.remove('active');
							formulaireConnexion.classList.add('inactive');
							formulaireInscription.classList.add('active');
							formulaireInscription.classList.remove('inactive');
					} else {
							formulaireInscription.classList.remove('active');
							formulaireInscription.classList.add('inactive');
							formulaireConnexion.classList.add('active');
							formulaireConnexion.classList.remove('inactive');
					}
			});
	});

	formulaires.forEach(formulaire => {
			formulaire.addEventListener('submit', async (e) => {
					e.preventDefault();
					
					if (validerFormulaire(formulaire)) {
							const boutonSubmit = formulaire.querySelector('.submit-btn');
							boutonSubmit.classList.add('loading');

							await new Promise(resolve => setTimeout(resolve, 2000));
							
							boutonSubmit.classList.remove('loading');
							afficherSucces(formulaire);
					}
			});

			const inputs = formulaire.querySelectorAll('input');
			inputs.forEach(input => {
					input.addEventListener('input', () => {
							validerInput(input);
					});

					input.addEventListener('blur', () => {
							validerInput(input);
					});
			});
	});

	function validerFormulaire(formulaire) {
			let estValide = true;
			const inputs = formulaire.querySelectorAll('input');
			
			inputs.forEach(input => {
					if (!validerInput(input)) {
							estValide = false;
					}
			});

			if (formulaire.id === 'registerForm') {
					const motDePasse = formulaire.querySelector('input[type="password"]');
					const confirmerMotDePasse = formulaire.querySelectorAll('input[type="password"]')[1];
					
					if (motDePasse.value !== confirmerMotDePasse.value) {
							afficherErreur(confirmerMotDePasse, 'Les mots de passe ne correspondent pas');
							estValide = false;
					}
			}

			return estValide;
	}

	function validerInput(input) {
			const champInput = input.parentElement;
			
			champInput.classList.remove('error');
			const erreurExistante = champInput.querySelector('.error-message');
			if (erreurExistante) {
					erreurExistante.remove();
			}

			if (input.value.trim() === '') {
					afficherErreur(input, 'Ce champ est requis');
					return false;
			}

			if (input.type === 'email' && !estEmailValide(input.value)) {
					afficherErreur(input, 'Veuillez entrer une adresse email valide');
					return false;
			}

			if (input.type === 'password' && input.value.length < 6) {
					afficherErreur(input, 'Le mot de passe doit contenir au moins 6 caractères');
					return false;
			}

			return true;
	}

	function afficherErreur(input, message) {
			const champInput = input.parentElement;
			champInput.classList.add('error');
			
			const messageErreur = document.createElement('span');
			messageErreur.classList.add('error-message');
			messageErreur.textContent = message;
			champInput.appendChild(messageErreur);
	}

	function afficherSucces(formulaire) {
			const boutonSubmit = formulaire.querySelector('.submit-btn');
			const contenuOriginal = boutonSubmit.innerHTML;
			
			boutonSubmit.innerHTML = '<i class="fas fa-check success-checkmark"></i>';
			boutonSubmit.style.backgroundColor = '#4CAF50';
			
			setTimeout(() => {
					boutonSubmit.innerHTML = contenuOriginal;
					boutonSubmit.style.backgroundColor = '';
					formulaire.reset();
			}, 2000);
	}

	function estEmailValide(email) {
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	formulaireConnexion.classList.add('active');
	formulaireInscription.classList.add('inactive');
});