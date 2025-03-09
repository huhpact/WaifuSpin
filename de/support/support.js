const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');
const faqItems = document.querySelectorAll('.faq__item');

const responses = {
    hallo: "Hallo! Wie kann ich Ihnen heute helfen?",
    hi: "Hi! Wie kann ich Ihnen behilflich sein?",
    hey: "Hey! Was kann ich für Sie tun?",
    grüße: "Grüße! Wie kann ich Ihnen helfen?",
    morgen: "Guten Morgen! Wie kann ich Ihnen behilflich sein?",
    nachmittag: "Guten Nachmittag! Wie kann ich Ihnen helfen?",
    abend: "Guten Abend! Wobei brauchen Sie Unterstützung?",
    hilfe: "Natürlich, ich bin hier, um zu helfen! Wobei benötigen Sie Unterstützung?",
    support: "Ich bin hier, um Sie zu unterstützen. Wobei brauchen Sie Hilfe?",
    unterstützung: "Wie kann ich Ihnen heute helfen?",
    konto: "Bei Problemen mit Ihrem Konto besuchen Sie bitte unsere Kontounterstützungsseite.",
    anmeldung: "Falls Sie Probleme bei der Anmeldung haben, besuchen Sie bitte unsere Anmeldehilfe-Seite.",
    passwort: "Bei Passwortproblemen können Sie Ihr Passwort auf unserer Passwort-zurücksetzen-Seite ändern.",
    krypto: "Wir unterstützen verschiedene Kryptowährungen. Für welche interessieren Sie sich?",
    bitcoin: "Bitcoin wird unterstützt. Brauchen Sie Hilfe bei Transaktionen?",
    ethereum: "Ethereum wird unterstützt. Wobei benötigen Sie Unterstützung?",
    litecoin: "Litecoin wird unterstützt. Wie kann ich Ihnen dabei helfen?",
    transaktion: "Bei Fragen zu Transaktionen besuchen Sie bitte unsere Transaktionssupport-Seite.",
    zahlung: "Bei Zahlungsproblemen besuchen Sie bitte unsere Zahlungs-Supportseite.",
    erstattung: "Für Rückerstattungsanfragen besuchen Sie bitte unsere Rückerstattungsrichtlinien-Seite.",
    versand: "Für Informationen zum Versand besuchen Sie bitte unsere Versanddetails-Seite.",
    bestellung: "Bei Fragen zu Bestellungen besuchen Sie bitte unsere Bestell-Supportseite.",
    produkt: "Für Produktinformationen besuchen Sie bitte unsere Produktdetails-Seite.",
    preisgestaltung: "Für Preisinformationen besuchen Sie bitte unsere Preisseite.",
    rabatt: "Für Informationen zu Rabatten besuchen Sie bitte unsere Rabattangebote-Seite.",
    abonnement: "Für Informationen zu Abonnements besuchen Sie bitte unsere Abonnement-Seite.",
    kündigen: "Um Ihr Abonnement zu kündigen, besuchen Sie bitte unsere Kündigungsseite.",
    upgrade: "Für Upgrade-Optionen besuchen Sie bitte unsere Upgrade-Seite.",
    downgrade: "Für Downgrade-Optionen besuchen Sie bitte unsere Downgrade-Seite.",
    testversion: "Für Informationen zu Testversionen besuchen Sie bitte unsere Testangebot-Seite.",
    funktionen: "Für Details zu unseren Funktionen besuchen Sie bitte unsere Funktionsseite.",
    kontakt: "Um uns zu kontaktieren, besuchen Sie bitte unsere Kontaktseite.",
    feedback: "Wir schätzen Ihr Feedback! Besuchen Sie bitte unsere Feedback-Seite.",
    beschwerde: "Um eine Beschwerde einzureichen, besuchen Sie bitte unsere Beschwerdeseite.",
    vorschlag: "Wir freuen uns über Ihre Vorschläge! Besuchen Sie bitte unsere Vorschlagsseite.",
    standard: "Es tut mir leid, aber das habe ich nicht verstanden. Können Sie das bitte umformulieren?"
};

window.addEventListener('DOMContentLoaded', () => {
    addMessage("Moino! Willkommen beim Waifuspin-Support. Wie kann ich Ihnen heute helfen? 🎮", false);
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
