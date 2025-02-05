const topicBtns = document.querySelectorAll('.topic-btn');
const faqSections = document.querySelectorAll('.faq-section');
const searchResults = document.querySelector('.search-results');

topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        topicBtns.forEach(b => b.classList.remove('active'));
        faqSections.forEach(section => section.classList.remove('active'));
        searchResults.classList.remove('active');

        btn.classList.add('active');
        const topic = btn.dataset.topic;

        if (topic === 'all') {
            faqSections.forEach(section => section.classList.add('active'));
        } else {
            document.querySelector(`.faq-section[data-topic="${topic}"]`).classList.add('active');
        }
    });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length > 0) {
        faqSections.forEach(section => section.classList.remove('active'));
        searchResults.classList.add('active');

        searchResults.innerHTML = '';

        let found = false;
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                found = true;
                const clone = item.cloneNode(true);
                clone.addEventListener('click', () => {
                    const isActive = clone.classList.contains('active');
                    searchResults.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                    if (!isActive) {
                        clone.classList.add('active');
                    }
                });
                searchResults.appendChild(clone);
            }
        });

        if (!found) {
            searchResults.innerHTML = `
                <div class="faq-item">
                    <div class="faq-question">結果は見つかりませんでした</div>
                    <div class="faq-answer">別のキーワードで検索してみてください。</div>
                </div>
            `;
        }
    } else {
        searchResults.classList.remove('active');
        document.querySelector('.topic-btn.active').click();
    }
});