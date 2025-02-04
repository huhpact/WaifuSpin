const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            if (entry.target.parentElement.classList.contains('stats-grid') ||
                entry.target.parentElement.classList.contains('benefits-grid')) {
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
const heroContent = document.querySelector('.hero-content');

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
        question: "Wie kann ich mich am Partnerprogramm beteiligen?",
        answer: "Klicken Sie einfach auf die Schaltfläche „Affiliate werden“ und folgen Sie unserem vereinfachten Anmeldeverfahren. Unser Team wird Ihren Antrag innerhalb von 24 Stunden prüfen und Sie erhalten nach der Genehmigung sofortigen Zugang zu unserem Affiliate-Dashboard."
    },
    {
        question: "Wann und wie werde ich bezahlt?",
        answer: "Wir verarbeiten Zahlungen automatisch am 1. eines jeden Monats für die Gewinne des Vormonats. Wir unterstützen mehrere Zahlungsoptionen für Kryptowährungen, darunter BTC, ETH, SOL und XRP, mit sofortiger Überweisung und nur 1% Bearbeitungsgebühr."
    },
    {
        question: "Wie hoch ist die Mindestgrenze für die Auszahlung?",
        answer: "Unsere Mindestauszahlungsschwelle liegt bei 100 $ für alle unterstützten Kryptowährungen. Sobald diese Schwelle erreicht ist, werden Ihre Gewinne automatisch im nächsten Auszahlungszyklus verarbeitet."
    },
    {
        question: "Wie wird der Anteil der Einnahmen berechnet?",
        answer: "Die Umsatzbeteiligung wird auf der Grundlage des Nettospielertrags (NSR) berechnet, der von den von Ihnen empfohlenen Spielern erwirtschaftet wird. Unser mehrstufiges System bietet einen Einkommensanteil von bis zu 45%, wobei die Raten je nach Ihrer monatlichen Leistung steigen."
    },
    {
        question: "Wie befolgen Sie die Empfehlungen?",
        answer: "Wir verwenden eine fortschrittliche Tracking-Technologie mit einer Cookie-Laufzeit von 365 Tagen. Alle Aktivitäten der Spieler werden in Echtzeit über unser sicheres Affiliate-Dashboard verfolgt, wodurch eine vollständige Transparenz gewährleistet ist."
    }
];

const faqGrid = document.querySelector('.faq-grid');
const faqSearch = document.querySelector('#faqSearch');

function createFaqElement(faq, index) {
    const faqElement = document.createElement('div');
    faqElement.className = 'faq-question';
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

    document.querySelectorAll('.faq-question[data-aos]').forEach(element => {
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