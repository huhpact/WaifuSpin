const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');
const faqItems = document.querySelectorAll('.faq__item');

const responses = {
    bonjour: "Bonjour! Comment puis-je vous aider aujourd'hui?",
    salut: "Salut! Comment puis-je vous aider?",
    hé: "Hé! Que puis-je faire pour vous?",
    salutations: "Salutations! Comment puis-je vous être utile?",
    matin: "Bonjour! Comment puis-je vous aider?",
    aprèsmidi: "Bon après-midi! Comment puis-je vous aider?",
    soir: "Bonsoir! De quoi avez-vous besoin?",
    aide: "Bien sûr, je suis là pour vous aider! De quoi avez-vous besoin?",
    support: "Je suis là pour vous soutenir. De quoi avez-vous besoin?",
    assistance: "Comment puis-je vous aider aujourd'hui?",
    compte: "Pour les problèmes liés au compte, veuillez visiter notre page de support de compte.",
    connexion: "Si vous avez des problèmes de connexion, veuillez consulter notre page d'aide à la connexion.",
    motdepasse: "Pour les problèmes de mot de passe, vous pouvez réinitialiser votre mot de passe sur notre page de réinitialisation de mot de passe.",
    crypto: "Nous supportons diverses cryptomonnaies. Laquelle vous intéresse?",
    bitcoin: "Le Bitcoin est supporté. Avez-vous besoin d'aide pour les transactions?",
    ethereum: "L'Ethereum est supporté. De quoi avez-vous besoin?",
    litecoin: "Le Litecoin est supporté. Comment puis-je vous aider avec cela?",
    transaction: "Pour les questions liées aux transactions, veuillez visiter notre page de support des transactions.",
    paiement: "Pour les problèmes de paiement, veuillez consulter notre page de support de paiement.",
    remboursement: "Pour les demandes de remboursement, veuillez visiter notre page de politique de remboursement.",
    expédition: "Pour les informations sur l'expédition, veuillez consulter notre page de détails d'expédition.",
    commande: "Pour les questions liées aux commandes, veuillez visiter notre page de support des commandes.",
    produit: "Pour les informations sur les produits, veuillez consulter notre page de détails des produits.",
    prix: "Pour les détails sur les prix, veuillez visiter notre page de tarification.",
    réduction: "Pour les informations sur les réductions, veuillez consulter notre page d'offres de réduction.",
    abonnement: "Pour les détails sur les abonnements, veuillez visiter notre page d'abonnement.",
    annuler: "Pour annuler votre abonnement, veuillez visiter notre page d'annulation.",
    miseajour: "Pour les options de mise à jour, veuillez consulter notre page de mise à jour.",
    rétrograder: "Pour les options de rétrogradation, veuillez visiter notre page de rétrogradation.",
    essai: "Pour les informations sur les essais, veuillez consulter notre page d'offres d'essai.",
    fonctionnalités: "Pour les détails sur les fonctionnalités, veuillez visiter notre page de fonctionnalités.",
    contact: "Pour nous contacter, veuillez visiter notre page de contact.",
    retour: "Nous apprécions vos retours! Veuillez visiter notre page de retour.",
    plainte: "Pour déposer une plainte, veuillez visiter notre page de plainte.",
    suggestion: "Nous apprécions vos suggestions! Veuillez visiter notre page de suggestion.",
    défaut: "Je suis désolé, je n'ai pas compris cela. Pouvez-vous reformuler?"
};

window.addEventListener('DOMContentLoaded', () => {
    addMessage("Bonjour! Bienvenue à l'assistance Waifuspin. Comment puis-je vous aider aujourd'hui? 🎮", false);
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
