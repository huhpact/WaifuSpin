const OPENAI_API_KEY = 'hier muss ich api noch adden , er commited sonst nicht'; 
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions--- auch den adden';

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');
const faqItems = document.querySelectorAll('.faq-item');

window.addEventListener('DOMContentLoaded', () => {
    addMessage("Bonjour ! Bienvenue à l'assistance WaifuSpin. Comment puis-je vous aider aujourd'hui ? 🎮", false);
    initFAQ();
});

async function sendToOpenAI(message) {
    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4-turbo-preview",
                messages: [{
                    role: 'system',
                    content: 'You are a helpful customer support agent for WaifuSpin, a crypto casino. Be professional, friendly, and knowledgeable about cryptocurrency, gambling, and account security. Keep responses concise and helpful. Never break character and you speak french.'
                }, {
                    role: 'user',
                    content: message
                }],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return "Je vous prie de m'excuser, mais je n'arrive pas à me connecter à notre système. Veuillez réessayer dans un instant.";
    }
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'agent'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (!isUser) {
        const typing = document.createElement('div');
        typing.className = 'typing';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typing.appendChild(dot);
        }
        messageContent.appendChild(typing);
        
        setTimeout(() => {
            typing.remove();
            messageContent.innerHTML = `<p>${content}</p>`;
        }, 1500);
    } else {
        messageContent.innerHTML = `<p>${content}</p>`;
    }
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        const response = await sendToOpenAI(message);
        addMessage(response);
    }
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        answer.style.height = '0px';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.height = '0px';
                    otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
                }
            });
            
            item.classList.toggle('active');
            answer.style.height = isOpen ? '0px' : `${answer.scrollHeight}px`;
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(45deg)';
        });
    });
}

sendButton.addEventListener('click', handleSendMessage);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});