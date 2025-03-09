const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            if (entry.target.parentElement.classList.contains('stats__grid') ||
                entry.target.parentElement.classList.contains('benefits__grid')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    hero.style.backgroundPosition = `center ${rate * 0.7}px`;
    
    heroContent.style.transform = `translateY(${rate * 0.2}px)`;
    
    const opacity = 1 - (scrolled / 1000);
    heroContent.style.opacity = opacity > 0 ? opacity : 0;
});

const faqData = [
    {
        question: "Comment puis-je adhérer au programme d'affiliation?",
        answer: "Il vous suffit de cliquer sur le bouton « Dévenir Affilié » et de suivre notre procédure d'inscription simplifiée. Notre équipe examinera votre demande dans les 24 heures et vous recevrez un accès immédiat à notre tableau de bord d'affilié après approbation."
    },
    {
        question: "Quand et comment suis-je payé?",
        answer: "Nous traitons les paiements automatiquement le 1er de chaque mois pour les gains du mois précédent. Nous prenons en charge plusieurs options de paiement en crypto-monnaies, notamment BTC, ETH, SOL et XRP, avec des transferts instantanés et seulement 1% de frais de traitement."
    },
    {
        question: "Quel est le seuil minimum de paiement?",
        answer: "Notre seuil de paiement minimum est de 100 $ pour toutes les crypto-monnaies prises en charge. Une fois ce seuil atteint, vos gains sont automatiquement traités dans le cycle de paiement suivant."
    },
    {
        question: "Comment la part des recettes est-elle calculée?",
        answer: "Le partage des revenus est calculé sur la base du revenu net des jeux (RNJ) généré par les joueurs que vous avez recommandés. Notre système à plusieurs niveaux offre jusqu'à 45 % de part de revenus, les taux augmentant en fonction de vos performances mensuelles."
    },
    {
        question: "Comment suivez-vous les recommandations?",
        answer: "Nous utilisons une technologie de suivi avancée avec une durée de cookie de 365 jours. Toutes les activités des joueurs sont suivies en temps réel via notre tableau de bord d'affiliation sécurisé, ce qui garantit une transparence totale."
    }
];

const faqGrid = document.querySelector('.faq__grid');
const faqSearch = document.querySelector('#faqSearch');

function createFaqElement(faq, index) {
    const faqElement = document.createElement('div');
    faqElement.className = 'faq__question';
    faqElement.setAttribute('data-aos', 'fade-right');
    faqElement.style.transitionDelay = `${index * 100}ms`;
    
    faqElement.innerHTML = `
        <h3>${faq.question}</h3>
        <p>${faq.answer}</p>
    `;
    
    return faqElement;
}

function renderFaqs(faqs) {
    faqGrid.innerHTML = '';
    faqs.forEach((faq, index) => {
        faqGrid.appendChild(createFaqElement(faq, index));
    });

    document.querySelectorAll('.faq__question[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

let searchTimeout;
faqSearch.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFaqs = faqData.filter(faq => 
            faq.question.toLowerCase().includes(searchTerm) || 
            faq.answer.toLowerCase().includes(searchTerm)
        );
        renderFaqs(filteredFaqs);
    }, 300);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

renderFaqs(faqData);