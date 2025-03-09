const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.classList.contains('stat__item')) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    setTimeout(() => {
                        progressBar.style.width = '100%';
                    }, 200);
                }
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

document.querySelectorAll('.benefit__card, .plan__card, .review__card, .stat__item').forEach((el) => {
    observer.observe(el);
});

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = easeOutQuart(progress);
        current = Math.floor(easedProgress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat__number').forEach((stat, index) => {
                setTimeout(() => {
                    const target = parseInt(stat.dataset.value);
                    animateNumber(stat, target);
                }, index * 200);
            });
            statsObserver.disconnect();
        }
    });
}, {
    threshold: 0.5
});

statsObserver.observe(document.querySelector('.stats'));

document.addEventListener('mousemove', (e) => {
    const floatingElements = document.querySelectorAll('.float__element');
    
    floatingElements.forEach(element => {
        const speed = element.dataset.speed || 1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

document.querySelectorAll('.benefit__card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / 15;
        const deltaY = (y - centerY) / 15;
        
        card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0, 0)';
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});