const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');
const faqItems = document.querySelectorAll('.faq__item');

const responses = {
    hello: "Hello! How can I assist you today?",
    hi: "Hi there! How can I help you?",
    hey: "Hey! What can I do for you?",
    greetings: "Greetings! How can I be of service?",
    morning: "Good morning! How can I assist you?",
    afternoon: "Good afternoon! How can I help you?",
    evening: "Good evening! What do you need help with?",
    help: "Sure, I'm here to help! What do you need assistance with?",
    support: "I'm here to support you. What do you need?",
    assistance: "How can I assist you today?",
    account: "For account-related issues, please visit our account support page.",
    login: "If you're having trouble logging in, please check our login help page.",
    password: "For password issues, you can reset your password on our password reset page.",
    crypto: "We support various cryptocurrencies. Which one are you interested in?",
    bitcoin: "Bitcoin is supported. Do you need help with transactions?",
    ethereum: "Ethereum is supported. What do you need assistance with?",
    litecoin: "Litecoin is supported. How can I help you with it?",
    transaction: "For transaction-related queries, please visit our transaction support page.",
    payment: "For payment issues, please check our payment support page.",
    refund: "For refund requests, please visit our refund policy page.",
    shipping: "For shipping information, please check our shipping details page.",
    order: "For order-related queries, please visit our order support page.",
    product: "For product information, please check our product details page.",
    pricing: "For pricing details, please visit our pricing page.",
    discount: "For discount information, please check our discount offers page.",
    subscription: "For subscription details, please visit our subscription page.",
    cancel: "To cancel your subscription, please visit our cancellation page.",
    upgrade: "For upgrade options, please check our upgrade page.",
    downgrade: "For downgrade options, please visit our downgrade page.",
    trial: "For trial information, please check our trial offers page.",
    features: "For feature details, please visit our features page.",
    contact: "To contact us, please visit our contact page.",
    feedback: "We value your feedback! Please visit our feedback page.",
    complaint: "To file a complaint, please visit our complaint page.",
    suggestion: "We appreciate your suggestions! Please visit our suggestion page.",
    default: "I'm sorry, I didn't understand that. Can you please rephrase?"
};

window.addEventListener('DOMContentLoaded', () => {
    addMessage("Good morning! Welcome to the Waifuspin assistance. How can I help you today? 🎮", false);
    initFAQ();
});

function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    for (const key in responses) {
        if (lowerCaseMessage.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'agent'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message__content';
    
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

function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        
        const response = getResponse(message);
        addMessage(response);
    }
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');
        const icon = item.querySelector('.faq__icon');
        
        answer.style.height = '0px';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__answer').style.height = '0px';
                    otherItem.querySelector('.faq__icon').style.transform = 'rotate(0deg)';
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
            });
    });
});
