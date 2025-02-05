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
        question: "どうすればアフィリエイト・プログラムに参加できますか？",
        answer: "アフィリエイトになる」ボタンをクリックし、簡単な登録手続きを行ってください。24時間以内に審査が行われ、承認されるとすぐにアフィリエイト・ダッシュボードにアクセスできるようになります。"
    },
    {
        question: "給料はいつ、どのように支払われますか？",
        answer: "毎月1日に、前月の収益に対して自動的に支払いが行われます。BTC、ETH、SOL、XRPを含む複数の暗号通貨の支払いオプションをサポートし、即時送金とわずか1%の処理手数料を実現しています。"
    },
    {
        question: "最低支払基準額はいくらですか？",
        answer: "当社の最低ペイアウト基準額は、サポートされているすべての暗号通貨で100ドルです。このしきい値に達すると、賞金は自動的に次の支払いサイクルに処理されます。当社の最低支払いしきい値は、サポートされているすべての暗号通貨で100ドルです。このしきい値に達すると、賞金は自動的に次の支払いサイクルに処理されます。"
    },
    {
        question: "レベニューシェアはどのように計算されるのですか？",
        answer: "レベニューシェアは、あなたが紹介したプレーヤーが生み出したネットゲーミングレベニュー（NGR）に基づいて計算されます。当社の段階的なシステムでは、最大45％の収益シェアが提供され、毎月のパフォーマンスに応じてレートが上がります。"
    },
    {
        question: "どのように勧告に従うのか？",
        answer: "クッキーの有効期間は365日です。すべてのプレイヤーの活動は、当社の安全なアフィリエイトダッシュボードを通じてリアルタイムで追跡され、完全な透明性を確保します。"
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