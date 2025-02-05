AOS.init({
	duration: 800,
	once: true,
	offset: 100
});

const quizQuestions = [
	{
			question: "Wie oft kommt es vor, dass Sie länger spielen als geplant?",
			options: [
					"Nie",
					"Manchmal",
					"Oft",
					"Fast immer"
			]
	},
	{
			question: "Haben Sie jemals vor anderen Personen verheimlicht, dass Sie ein Spieler sind?",
			options: [
					"Nie",
					"Selten",
					"Manchmal",
					"Oft"
			]
	},
	{
			question: "Wie oft geben Sie mehr Geld für Spiele aus, als Sie sich leisten können?",
			options: [
					"Nie",
					"Gelegentlich",
					"Regelmäßig",
					"Sehr regelmäßig"
			]
	},
	{
			question: "Fühlen Sie sich unwohl, wenn Sie versuchen, Ihren Spielkonsum zu reduzieren?",
			options: [
					"Überhaupt nicht",
					"Leicht",
					"Joa",
					"Schon stark"
			]
	},
	{
			question: "Haben Sie durch das Spielen schon einmal wichtige Termine oder Verabredungen verpasst?",
			options: [
					"Nie",
					"Ein oder zwei Mal",
					"mehrere Male",
					"Regelmäßig"
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
					${currentQuestion > 0 ? '<button onclick="previousQuestion()" class="secondary-button">Vorherige</button>' : ''}
					<button onclick="nextQuestion()" class="primary-button">Nächste</button>
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
			alert('Bitte wählen Sie eine Option, bevor Sie fortfahren');
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
					message = "Ihre Spielgewohnheiten scheinen unter Kontrolle zu sein.";
					recommendations = "Achten Sie weiterhin auf Ihre Spielzeit und halten Sie sich an gesunde Grenzen.";
					break;
			case 'moderate':
					message = "Es besteht die Gefahr, dass Sie problematische Spielgewohnheiten entwickeln.";
					recommendations = "Ziehen Sie in Erwägung, strengere Grenzen zu setzen und Ihre Ausgaben für das Spielen zu überwachen.";
					break;
			case 'high':
					message = "Ihre Antworten weisen auf potenzielle Bedenken im Zusammenhang mit Spielen hin.";
					recommendations = "Wir empfehlen Ihnen dringend, sich an unser Support-Team zu wenden, um persönliche Hilfe zu erhalten.";
					break;
	}

	quizContent.innerHTML = `
			<div class="quiz-results">
					<h3>Résultats de l'évaluation</h3>
					<p>${message}</p>
					<p class="recommendations">${recommendations}</p>
					<div class="quiz-navigation">
							<button onclick="closeQuiz()" class="primary-button">Schließen</button>
							<button onclick="startChat()" class="secondary-button">Sich an den Support wenden</button>
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
	alert("Verbindung zum Live-Support...");
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