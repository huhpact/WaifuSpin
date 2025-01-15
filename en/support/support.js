export function initFAQ() {
	document.querySelectorAll('.faq-question').forEach(question => {
			question.addEventListener('click', () => {
					const faqItem = question.parentElement;
					const isActive = faqItem.classList.contains('active');

					document.querySelectorAll('.faq-item').forEach(item => {
							item.classList.remove('active');
							item.style.height = null;
					});

					if (!isActive) {
							faqItem.classList.add('active');
							const answer = faqItem.querySelector('.faq-answer');
							answer.style.height = answer.scrollHeight + 'px';
					}
			});
	});
}

const responses = [
	{
			text: "Thank you for reaching out! How can I assist you today?",
			type: "greeting"
	},
	{
			text: "I understand your concern. This seems like a complex issue. Would you like me to connect you with our specialized support team?",
			type: "escalation"
	},
	{
			text: "That's a great question! Here's what you need to know...",
			type: "info"
	},
	{
			text: "I'm looking into this for you. One moment please.",
			type: "processing"
	},
	{
			text: "This seems like a situation that requires more detailed assistance. Would you like me to arrange a call with our support team?",
			type: "escalation"
	},
	{
			text: "For this specific case, it would be best to speak with our dedicated support team. Would you like me to create a priority ticket for you?",
			type: "escalation"
	},
	{
			text: "Let me guide you through the basic troubleshooting steps first.",
			type: "help"
	},
	{
			text: "I appreciate your patience. Given the complexity, I recommend speaking directly with our technical team.",
			type: "escalation"
	}
];

export function initChat() {
	const chatMessages = document.getElementById('chatMessages');
	const userInput = document.getElementById('userInput');
	const sendButton = document.getElementById('sendButton');

	function addMessage(message, isUser) {
			const messageDiv = document.createElement('div');
			messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
			
			if (!isUser) {
					const botProfile = document.createElement('div');
					botProfile.className = 'bot-profile';
					botProfile.innerHTML = `
							<img src="https://api.dicebear.com/7.x/bottts/svg?seed=support" alt="Support Bot">
					`;
					messageDiv.appendChild(botProfile);
			}
			
			const messageContent = document.createElement('div');
			messageContent.className = 'message-content';
			messageContent.textContent = message.text || message;
			messageDiv.appendChild(messageContent);
		
			messageDiv.style.opacity = '0';
			messageDiv.style.transform = 'translateY(20px)';
			
			chatMessages.appendChild(messageDiv);

			requestAnimationFrame(() => {
					messageDiv.style.opacity = '1';
					messageDiv.style.transform = 'translateY(0)';
			});
			
			chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	function getRandomResponse() {
			return responses[Math.floor(Math.random() * responses.length)];
	}

	function handleSendMessage() {
			const message = userInput.value.trim();
			if (message) {
					addMessage(message, true);
					userInput.value = '';
	
					const typingIndicator = document.createElement('div');
					typingIndicator.className = 'typing-indicator';
					typingIndicator.innerHTML = '<span></span><span></span><span></span>';
					chatMessages.appendChild(typingIndicator);
	
					setTimeout(() => {
							typingIndicator.remove();
							addMessage(getRandomResponse(), false);
					}, 1500);
			}
	}

	sendButton.addEventListener('click', handleSendMessage);
	userInput.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') {
					handleSendMessage();
			}
	});
}

export function initNumberAnimation() {
	const numbers = document.querySelectorAll('.number');
	
	const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							const target = parseInt(entry.target.getAttribute('data-target'));
							const duration = 1500; 
							const steps = 30; 
							let current = 0;
						
							const easeOutQuart = t => 1 - (--t) * t * t * t;
							
							let startTime = null;
							
							function animate(currentTime) {
									if (!startTime) startTime = currentTime;
									const progress = Math.min((currentTime - startTime) / duration, 1);
									
									current = Math.floor(target * easeOutQuart(progress));
									entry.target.textContent = current;
									
									if (progress < 1) {
											requestAnimationFrame(animate);
									} else {
											entry.target.textContent = target;
									}
							}
							
							requestAnimationFrame(animate);
							observer.unobserve(entry.target);
					}
			});
	}, { threshold: 0.5 });

	numbers.forEach(number => observer.observe(number));
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
					const headerOffset = 80;
					const elementPosition = target.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
							top: offsetPosition,
							behavior: 'smooth'
					});
			}
	});
});

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
	initNumberAnimation();
	initChat();
	initFAQ();
});

document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  const toggleSidebar = () => {
    const isActive = sidebar.classList.contains('active');
    sidebar.classList.toggle('active', !isActive);
    overlay.classList.toggle('active', !isActive);
  };

  const closeSidebar = (event) => {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnBurger = burgerMenu.contains(event.target);
    if (!isClickInsideSidebar && !isClickOnBurger) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  };

  burgerMenu.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('click', closeSidebar); 
});

async function fetchBitcoinRate() {
	try {
			const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
			const data = await response.json();
			const rate = parseFloat(data.bpi.USD.rate.replace(',', ''));
			document.querySelector('.btc-rate').textContent = `1 BTC = $${rate.toFixed(2)}`;
	} catch (error) {
			console.error('Error fetching Bitcoin rate:', error);
	}
}

window.onload = fetchBitcoinRate;

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