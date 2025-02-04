AOS.init({
	duration: 800,
	once: true,
	offset: 100
});

const quizQuestions = [
	{
			question: "Combien de fois vous arrive-t-il de jouer plus longtemps que prévu?",
			options: [
					"Jamais",
					"Parfois",
					"Souvent",
					"Presque toujours"
			]
	},
	{
			question: "Avez-vous déjà caché votre activité de joueur à d'autres personnes?",
			options: [
					"Jamais",
					"Rarement",
					"Parfois",
					"Souvent"
			]
	},
	{
			question: "Combien de fois dépensez-vous plus que vous ne pouvez vous le permettre pour des jeux?",
			options: [
					"Jamais",
					"Occasionnellement",
					"Fréquemment",
					"Très fréquemment"
			]
	},
	{
			question: "Vous sentez-vous mal à l'aise lorsque vous essayez de réduire votre consommation de jeux?",
			options: [
					"Pas du tout",
					"Légèrement",
					"Modérément",
					"Sévèrement"
			]
	},
	{
			question: "Le jeu vous a-t-il déjà fait manquer des échéances ou des rendez-vous importants?",
			options: [
					"Jamais",
					"Une ou deux fois",
					"Plusieurs fois",
					"Fréquemment"
			]
	}
];

let currentQuestion = 0;
let answers = [];

const modal = document.getElementById('quizModal');
const quizContent = document.getElementById('quizContent');
const startQuizBtn = document.getElementById('startQuiz');

function showQuiz() {
	modal.style.display = 'block';
	showQuestion();
}

function closeQuiz() {
	modal.style.display = 'none';
	currentQuestion = 0;
	answers = [];
}

function showQuestion() {
	if (currentQuestion >= quizQuestions.length) {
			showResults();
			return;
	}

	const question = quizQuestions[currentQuestion];
	let html = `
			<div class="quiz-question">
					<h3>${question.question}</h3>
					<div class="quiz-options">
							${question.options.map((option, index) => `
									<div class="quiz-option" onclick="selectOption(${index})">
											${option}
									</div>
							`).join('')}
					</div>
			</div>
			<div class="quiz-navigation">
					${currentQuestion > 0 ? '<button onclick="previousQuestion()" class="secondary-button">Précédent</button>' : ''}
					<button onclick="nextQuestion()" class="primary-button">Suivant</button>
			</div>
	`;
	quizContent.innerHTML = html;
}

function selectOption(index) {
	const options = document.querySelectorAll('.quiz-option');
	options.forEach(option => option.classList.remove('selected'));
	options[index].classList.add('selected');
	answers[currentQuestion] = index;
}

function nextQuestion() {
	if (typeof answers[currentQuestion] === 'undefined') {
			alert('Veuillez sélectionner une option avant de continuer');
			return;
	}
	currentQuestion++;
	showQuestion();
}

function previousQuestion() {
	currentQuestion--;
	showQuestion();
}

function showResults() {
	const riskLevel = calculateRiskLevel();
	let message = '';
	let recommendations = '';

	switch(riskLevel) {
			case 'low':
					message = "Vos habitudes de jeu semblent être sous contrôle.";
					recommendations = "Continuez à surveiller votre temps de jeu et à maintenir des limites saines.";
					break;
			case 'moderate':
					message = "Vous risquez de développer des habitudes de jeu problématiques.";
					recommendations = "Envisagez de fixer des limites plus strictes et de suivre vos dépenses liées aux jeux.";
					break;
			case 'high':
					message = "Vos réponses indiquent des préoccupations potentielles liées aux jeux.";
					recommendations = "Nous vous recommandons vivement de contacter notre équipe d'assistance pour obtenir une aide personnalisée.";
					break;
	}

	quizContent.innerHTML = `
			<div class="quiz-results">
					<h3>Résultats de l'évaluation</h3>
					<p>${message}</p>
					<p class="recommendations">${recommendations}</p>
					<div class="quiz-navigation">
							<button onclick="closeQuiz()" class="primary-button">Fermer</button>
							<button onclick="startChat()" class="secondary-button">S'adresser à l'assistance</button>
					</div>
			</div>
	`;
}

function calculateRiskLevel() {
	const score = answers.reduce((total, answer) => total + answer, 0);
	if (score <= 5) return 'low';
	if (score <= 10) return 'moderate';
	return 'high';
}

startQuizBtn.addEventListener('click', showQuiz);

document.querySelector('.close-modal').addEventListener('click', closeQuiz);

window.addEventListener('click', (e) => {
	if (e.target === modal) {
			closeQuiz();
	}
});

function startChat() {
	alert("Se connecter à l'assistance en direct...");
}

document.querySelectorAll('button').forEach(button => {
	button.addEventListener('mouseenter', () => {
			button.style.transform = 'scale(1.05)';
	});
	
	button.addEventListener('mouseleave', () => {
			button.style.transform = 'scale(1)';
	});
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
					target.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
					});
			}
	});
});

document.querySelectorAll('.contact-item, .resource-card, .social-item').forEach(item => {
	item.addEventListener('mouseenter', () => {
			item.style.transform = 'translateY(-5px)';
	});
	
	item.addEventListener('mouseleave', () => {
			item.style.transform = 'translateY(0)';
	});
});