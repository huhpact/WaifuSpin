AOS.init({
	duration: 800,
	once: true,
	offset: 100
});

const quizQuestions = [
	{
			question: "How often do you play longer than planned?",
			options: [
					"Never",
					"Sometimes",
					"Often",
					"Almost always"
			]
	},
	{
			question: "Have you ever hidden your gaming activity from others?",
			options: [
					"Never",
					"Rarely",
					"Sometimes",
					"Often"
			]
	},
	{
			question: "How often do you spend more than you can afford on games?",
			options: [
					"Never",
					"Occasionally",
					"Frequently",
					"Very frequently"
			]
	},
	{
			question: "Do you feel uncomfortable when you try to reduce your gaming time?",
			options: [
					"Not at all",
					"Slightly",
					"Moderately",
					"Severely"
			]
	},
	{
			question: "Has gaming ever caused you to miss important deadlines or appointments?",
			options: [
					"Never",
					"Once or twice",
					"Several times",
					"Frequently"
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
					${currentQuestion > 0 ? '<button onclick="previousQuestion()" class="secondary-button">Previous</button>' : ''}
					<button onclick="nextQuestion()" class="primary-button">Next</button>
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
			alert('Please select an option before continuing');
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
					message = "Your gaming habits seem to be under control.";
					recommendations = "Continue to monitor your gaming time and maintain healthy limits.";
					break;
			case 'moderate':
					message = "You are at risk of developing problematic gaming habits.";
					recommendations = "Consider setting stricter limits and tracking your gaming-related expenses.";
					break;
			case 'high':
					message = "Your responses indicate potential gaming-related concerns.";
					recommendations = "We strongly recommend contacting our support team for personalized help.";
					break;
	}

	quizContent.innerHTML = `
			<div class="quiz-results">
					<h3>Assessment Results</h3>
					<p>${message}</p>
					<p class="recommendations">${recommendations}</p>
					<div class="quiz-navigation">
							<button onclick="closeQuiz()" class="primary-button">Close</button>
							<button onclick="startChat()" class="secondary-button">Contact Support</button>
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
	alert("Connecting to live support...");
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