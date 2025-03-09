document.querySelectorAll('button, .feature__card, .stat__card, .logo').forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('active'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

const languageButtons = document.querySelectorAll('.lang__btn');

function setLanguage(lang) {
    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
            if (element.hasAttribute('data-text')) {
                element.setAttribute('data-text', translations[lang][key]);
            }
        }
    });

    document.documentElement.lang = lang;
}

const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
const supportedLangs = ['en', 'de', 'ja', 'fr'];
const initialLang = supportedLangs.includes(userLang) ? userLang : 'en';
setLanguage(initialLang);

languageButtons.forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '20px'
});

document.querySelectorAll('.feature__card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
});

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        if (end >= 1000) {
            element.textContent = current.toLocaleString() + '+';
        } else {
            element.textContent = current.toFixed(1) + '%';
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const value = parseFloat(element.getAttribute('data-value'));
            animateValue(element, 0, value, 2000);
            statsObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__number[data-value]').forEach(stat => {
    statsObserver.observe(stat);
});