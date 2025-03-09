AOS.init({
	duration: 800,
	once: true,
	offset: 100
});

const quizQuestions = [
	{
			question: "予定より長くプレーすることはよくありますか？",
			options: [
					"決して",
					"時々",
					"しばしば",
					"ほとんど常に"
			]
	},
	{
			question: "ギャンブルを他人に隠したことがありますか？",
			options: [
					"決して",
					"めったにない",
					"時々",
					"しばしば"
			]
	},
	{
			question: "余裕のないほどゲームに費やすことはよくある？",
			options: [
					"決して",
					"時々",
					"頻繁に",
					"非常に頻繁に"
			]
	},
	{
			question: "ゲームを減らそうとすることに抵抗を感じますか？",
			options: [
					"まったく",
					"わずかに",
					"ほどほどに",
					"ひどく"
			]
	},
	{
			question: "ギャンブルのせいで、重要な締め切りや約束を逃したことはありますか？",
			options: [
					"決して",
					"一度か二度",
					"数回",
					"頻繁に"
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
			<div class="quiz__question">
					<h3>${question.question}</h3>
					<div class="quiz__options">
							${question.options.map((option, index) => `
									<div class="quiz__option" onclick="selectOption(${index})">
											${option}
									</div>
							`).join('')}
					</div>
			</div>
			<div class="quiz__navigation">
					${currentQuestion > 0 ? '<button onclick="previousQuestion()" class="secondary__button">前へ</button>' : ''}
					<button onclick="nextQuestion()" class="primary__button">次のページ</button>
			</div>
	`;
	quizContent.innerHTML = html;
}

function selectOption(index) {
	const options = document.querySelectorAll('.quiz__option');
	options.forEach(option => option.classList.remove('selected'));
	options[index].classList.add('selected');
	answers[currentQuestion] = index;
}

function nextQuestion() {
	if (typeof answers[currentQuestion] === 'undefined') {
			alert('続行する前にオプションを選択してください');
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
					message = "あなたのギャンブル癖はコントロールできているようだ。";
					recommendations = "プレー時間を監視し、健康的な制限を維持し続ける。";
					break;
			case 'moderate':
					message = "ギャンブル依存症になる危険性があります。";
					recommendations = "限度額を厳しく設定し、ギャンブルの出費を記録することを検討してください。";
					break;
			case 'high':
					message = "あなたの回答は、ゲームに関する潜在的な懸念を示しています。";
					recommendations = "弊社サポートチームまでお問い合わせください。";
					break;
	}

	quizContent.innerHTML = `
			<div class="quiz__results">
					<h3>Résultats de l'évaluation</h3>
					<p>${message}</p>
					<p class="recommendations">${recommendations}</p>
					<div class="quiz__navigation">
							<button onclick="closeQuiz()" class="primary__button">閉じる</button>
							<button onclick="startChat()" class="secondary__button">お問い合わせ</button>
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

document.querySelector('.close__modal').addEventListener('click', closeQuiz);

window.addEventListener('click', (e) => {
	if (e.target === modal) {
			closeQuiz();
	}
});

function startChat() {
	alert("ライブサポートに接続...");
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

document.querySelectorAll('.contact__item, .resource__card, .social__item').forEach(item => {
	item.addEventListener('mouseenter', () => {
			item.style.transform = 'translateY(-5px)';
	});
	
	item.addEventListener('mouseleave', () => {
			item.style.transform = 'translateY(0)';
	});
});